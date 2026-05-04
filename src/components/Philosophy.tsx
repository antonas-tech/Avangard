import { Reveal, Stagger, StaggerItem } from "../lib/Reveal";

export function Philosophy() {
  return (
    <section
      id="philosophy"
      className="relative bg-sand-100 py-28 md:py-40"
    >
      <div className="container-editorial">
        <div className="grid grid-cols-12 gap-y-12 md:gap-x-10">
          <div className="col-span-12 md:col-span-3">
            <Reveal>
              <span className="eyebrow">02 — Философия</span>
            </Reveal>
          </div>

          <div className="col-span-12 md:col-span-9">
            <Reveal>
              <h2 className="heading-display text-[36px] leading-[1.05] sm:text-[48px] md:text-[72px]">
                Мы&nbsp;убеждены, что мебель —
                <span className="text-graphite-mute">
                  {" "}
                  это не&nbsp;объект, а&nbsp;продолжение архитектуры дома.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-10 max-w-2xl text-[16px] leading-[1.7] text-graphite-soft md:text-[18px]">
                Каждый модуль <em className="font-serif italic text-forest-300">avangard</em>{" "}
                собирается вручную: выверенный зазор, мягкое
                закрытие, отшлифованная вручную кромка. Мы&nbsp;не&nbsp;экономим
                на&nbsp;узлах, которые никто не&nbsp;увидит — потому что вы
                будете их чувствовать каждый день.
              </p>
            </Reveal>

            <Stagger className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6" delay={0.2} stagger={0.12}>
              <Pillar
                index="01"
                title="Деталировка"
                copy="Скрытая фурнитура, идеально совпадающие текстуры на стыках, каркас из массива."
              />
              <Pillar
                index="02"
                title="Материалы"
                copy="Шпон европейского дуба, термообработанный ясень, кварцит, латунь и&nbsp;натуральная кожа."
              />
              <Pillar
                index="03"
                title="Геометрия"
                copy="Тонкие фасады 16&nbsp;мм, миллиметровые радиусы и&nbsp;спокойные пропорции по золотому сечению."
              />
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pillar({
  index,
  title,
  copy,
}: {
  index: string;
  title: string;
  copy: string;
}) {
  return (
    <StaggerItem className="border-t border-forest-300/15 pt-6">
      <div className="flex items-center justify-between">
        <span className="font-serif text-[15px] text-forest-300">{index}</span>
        <span className="h-px w-8 bg-forest-300/25" />
      </div>
      <h3 className="mt-6 font-serif text-[26px] leading-tight tracking-editorial text-forest-300 md:text-[28px]">
        {title}
      </h3>
      <p
        className="mt-3 text-[14.5px] leading-[1.7] text-graphite-soft"
        dangerouslySetInnerHTML={{ __html: copy }}
      />
    </StaggerItem>
  );
}
