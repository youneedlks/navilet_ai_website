-- Индекс спроса: цифры для src/lib/seo/demand-index.ts
--
-- Запуск (только чтение):
--   ssh root@5.129.202.189 'docker exec -i lk-aimpact-postgres-1 psql -U mgp -d mgp -tA -F" | " \
--     -v start=2026-06-01 -v cur=2026-09-01 -v end=2026-09-25' < scripts/demand-index.sql
--
-- start — начало периода, cur — начало текущего месяца (тренд = доля в cur..end
-- минус доля в start..cur), end — первый день, который НЕ входит в выпуск.
-- Единица — диалог, по последнему поиску (самый уточнённый запрос туриста).
-- Демо-ассистенты navilet.ru исключены.
-- Не публикуются: число диалогов и поисков, звёздность (подставляет бот —
-- турист называет её сам лишь в 7–14% диалогов), города вылета и месячные
-- объёмы (зависят от состава подключённых агентств).
-- Колонка n — служебная, для проверки размера выборки; на сайт не выносится.

create temp view b as
 select ts.*, (ts.created_at at time zone 'Europe/Moscow') msk,
   case when ts.date_from ~ '^\d\d\.\d\d\.\d{4}$' then to_date(ts.date_from, 'DD.MM.YYYY') end dfrom
 from tour_searches ts join conversations c on c.id = ts.conversation_id
 where (ts.created_at at time zone 'Europe/Moscow') >= :'start'
   and (ts.created_at at time zone 'Europe/Moscow') < :'end'
   and c.assistant_id not in ('e919868a-abae-4d5e-87bb-67935c5cca30', 'f745cbae-cf5c-431c-bcc8-81302ada48c9');

create temp view l as
 select distinct on (conversation_id) * from b order by conversation_id, created_at desc;

create temp view lc as select * from l where country is not null;

create temp view u as
 select l.*, exists (
   select 1 from messages m where m.conversation_id = l.conversation_id and m.role = 'user'
     and lower(m.content) ~ 'вс[её]\s*включ|все вкл|ол+ инкл|all\s*incl|\mai\M|\muai\M|ультра'
 ) ai_explicit
 from l;

\echo === share: country | n | share_pct | prev_pct | cur_pct | trend_pp
select country, count(*),
  round(100.0 * count(*) / (select count(*) from lc), 1),
  round(100.0 * count(*) filter (where msk < :'cur') / (select count(*) from lc where msk < :'cur'), 1),
  round(100.0 * count(*) filter (where msk >= :'cur') / (select count(*) from lc where msk >= :'cur'), 1),
  round(100.0 * count(*) filter (where msk >= :'cur') / (select count(*) from lc where msk >= :'cur')
      - 100.0 * count(*) filter (where msk < :'cur') / (select count(*) from lc where msk < :'cur'), 1)
from lc group by country order by 2 desc limit 14;

\echo === by search month: month | country | pct
select mo, country, pct from (
  select to_char(msk, 'YYYY-MM') mo, country,
    round(100.0 * count(*) / sum(count(*)) over (partition by to_char(msk, 'YYYY-MM'))) pct
  from lc group by 1, 2
) x where country in (4, 1, 16, 47, 2, 13) order by 1, 3 desc;

\echo === by departure month: month | country | pct, затем объём по месяцам (публиковать месяцы, где поисков достаточно)
select to_char(dfrom, 'YYYY-MM') mo, country, round(100.0 * count(*) / sum(count(*)) over (partition by to_char(dfrom, 'YYYY-MM')))
from lc where dfrom >= msk::date group by 1, 2
having to_char(dfrom, 'YYYY-MM') >= to_char(:'cur'::date, 'YYYY-MM')
order by 1, 3 desc;
select to_char(dfrom, 'YYYY-MM'), count(*) from lc where dfrom >= msk::date group by 1 order by 1;

\echo === per country: country | n | noflight_pct | budget_n | budget_median | kids_pct | nights_median | horizon_median | horizon_le14_pct | ai_explicit_pct
select u.country, count(*),
  round(100.0 * avg((departure = 99 or search_type = 'without_flight')::int)),
  count(*) filter (where price_to > 0 and price_to < 5000000),
  percentile_cont(0.5) within group (order by price_to) filter (where price_to > 0 and price_to < 5000000),
  round(100.0 * avg((children > 0)::int)),
  percentile_cont(0.5) within group (order by nights_from),
  percentile_cont(0.5) within group (order by dfrom - msk::date) filter (where dfrom >= msk::date),
  round(100.0 * count(*) filter (where dfrom >= msk::date and dfrom - msk::date <= 14) / nullif(count(*) filter (where dfrom >= msk::date), 0)),
  round(100.0 * avg(ai_explicit::int))
from u where country in (4, 1, 16, 47, 2, 13, 8, 46, 9, 12) group by 1 order by 2 desc;

\echo === overall: budget p25 | median | p75 | kids | solo | two_adults | 3plus_adults | nights_median | ai_explicit | horizon_median | le14 | gt60
select
  percentile_cont(0.25) within group (order by price_to) filter (where price_to > 0 and price_to < 5000000),
  percentile_cont(0.5) within group (order by price_to) filter (where price_to > 0 and price_to < 5000000),
  percentile_cont(0.75) within group (order by price_to) filter (where price_to > 0 and price_to < 5000000),
  round(100.0 * avg((children > 0)::int)),
  round(100.0 * avg((adults = 1 and children = 0)::int)),
  round(100.0 * avg((adults = 2 and children = 0)::int)),
  round(100.0 * avg((adults >= 3)::int)),
  percentile_cont(0.5) within group (order by nights_from),
  round(100.0 * avg(ai_explicit::int)),
  percentile_cont(0.5) within group (order by dfrom - msk::date) filter (where dfrom >= msk::date),
  round(100.0 * count(*) filter (where dfrom >= msk::date and dfrom - msk::date <= 14) / count(*) filter (where dfrom >= msk::date)),
  round(100.0 * count(*) filter (where dfrom - msk::date > 60) / count(*) filter (where dfrom >= msk::date))
from u;

\echo === nights: nights | pct
select nights_from, round(100.0 * count(*) / sum(count(*)) over ()) from l where nights_from is not null
group by 1 order by 2 desc limit 6;

\echo === budget stated: pct of dialogs
select round(100.0 * avg((price_to > 0)::int)) from l;
