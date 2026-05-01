"use client";

import { useEffect, useMemo, useState } from "react";

type Service = {
  name: string;
  price: number;
  description: string;
  icon: "bottle" | "scissors" | "spa";
};

type Addon = {
  name: string;
  price: number;
};

const services: Service[] = [
  {
    name: "基础香波洗",
    price: 88,
    description: "温和清洁、吹干梳理、耳眼清洁、脚底毛整理。",
    icon: "bottle",
  },
  {
    name: "精致造型洗剪",
    price: 188,
    description: "全身修剪、造型沟通、毛发护理，适合毛量较多的宝贝。",
    icon: "scissors",
  },
  {
    name: "SPA 深层护理",
    price: 288,
    description: "草本浴、除味护理、皮毛滋养，适合敏感肌和换毛期。",
    icon: "spa",
  },
];

const environments = [
  {
    title: "接待等候区",
    description: "木饰面、石材台面与柔和灯光，适合到店登记和短暂陪伴等候。",
    image: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=900&q=86",
    alt: "高端宠物店接待等候区",
  },
  {
    title: "洗护 SPA 区",
    description: "独立水池、恒温风干与防滑地面，减少宠物在护理过程中的紧张感。",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=86",
    alt: "宠物洗护SPA护理区",
  },
  {
    title: "造型护理区",
    description: "明亮操作台和分区收纳，护理师可完成修毛、梳理和细节造型。",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=86",
    alt: "宠物造型护理区",
  },
];

const petTypes = ["小型犬", "中型犬", "大型犬", "猫咪"] as const;
const stores = ["滨江阳光店", "湖畔生活店", "城市花园店"];
const slots = ["10:00", "12:30", "15:00", "18:30"];
const addons: Addon[] = [
  { name: "指甲精修", price: 28 },
  { name: "牙齿清洁", price: 48 },
  { name: "泪痕护理", price: 38 },
  { name: "接送服务", price: 68 },
];

const sizeAdjustments: Record<(typeof petTypes)[number], number> = {
  小型犬: 0,
  中型犬: 40,
  大型犬: 90,
  猫咪: 30,
};

const cardShell = "rounded-lg border border-[#dfe6eb]/90 bg-white/75 shadow-[0_10px_30px_rgba(35,49,63,0.08)]";
const fieldClass =
  "w-full rounded-lg border border-[#f0dbe1] bg-white px-[13px] py-3 text-[#49333a] outline-none transition focus:border-[#f6b8c8] focus:shadow-[0_0_0_4px_rgba(113,200,170,0.16)]";

function todayInputValue() {
  const today = new Date();
  return today.toISOString().slice(0, 10);
}

function formatDate(value: string) {
  if (!value) return "今天";
  const selected = new Date(`${value}T00:00:00`);
  if (value === todayInputValue()) return "今天";
  return `${selected.getMonth() + 1}月${selected.getDate()}日`;
}

function ServiceIcon({ icon }: { icon: Service["icon"] }) {
  const className = "h-7 w-7 text-[#bf6f86]";

  if (icon === "scissors") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="m4 20 8-8" />
        <circle cx="7" cy="7" r="3" />
        <circle cx="17" cy="17" r="3" />
        <path d="m14 10 6-6" />
      </svg>
    );
  }

  if (icon === "spa") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3c3 3 5 6 5 9a5 5 0 0 1-10 0c0-3 2-6 5-9Z" />
        <path d="M6 20c4-2 8-2 12 0" />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M8 3h8v4H8z" />
      <path d="M10 7h4v3l3 3v8H7v-8l3-3z" />
      <path d="M10 16h4" />
    </svg>
  );
}

function AddressIcon({ kind }: { kind: "pin" | "calendar" | "parking" }) {
  if (kind === "calendar") {
    return (
      <svg className="mt-px h-[18px] w-[18px] shrink-0 text-[#bf6f86]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M8 2v4M16 2v4M3 10h18" />
        <rect x="3" y="4" width="18" height="18" rx="3" />
      </svg>
    );
  }

  if (kind === "parking") {
    return (
      <svg className="mt-px h-[18px] w-[18px] shrink-0 text-[#bf6f86]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 16h14M7 16l1.5-7h7L17 16M8 16v3M16 16v3" />
        <circle cx="8" cy="19" r="1" />
        <circle cx="16" cy="19" r="1" />
      </svg>
    );
  }

  return (
    <svg className="mt-px h-[18px] w-[18px] shrink-0 text-[#bf6f86]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 21s7-5.4 7-12a7 7 0 1 0-14 0c0 6.6 7 12 7 12Z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

export default function Home() {
  const [selectedService, setSelectedService] = useState(services[0]);
  const [selectedTime, setSelectedTime] = useState("12:30");
  const [petName, setPetName] = useState("奶油");
  const [petType, setPetType] = useState<(typeof petTypes)[number]>("小型犬");
  const [ownerName, setOwnerName] = useState("张女士");
  const [phone, setPhone] = useState("138 0000 0000");
  const [date, setDate] = useState("");
  const [store, setStore] = useState(stores[0]);
  const [notes, setNotes] = useState("");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    setDate(todayInputValue());
  }, []);

  const chosenAddons = useMemo(
    () => addons.filter((addon) => selectedAddons.includes(addon.name)),
    [selectedAddons],
  );

  const total = useMemo(() => {
    const addonTotal = chosenAddons.reduce((sum, addon) => sum + addon.price, 0);
    return selectedService.price + sizeAdjustments[petType] + addonTotal;
  }, [chosenAddons, petType, selectedService.price]);

  function toggleAddon(addonName: string) {
    setSelectedAddons((current) =>
      current.includes(addonName) ? current.filter((name) => name !== addonName) : [...current, addonName],
    );
  }

  function confirmBooking() {
    setToastVisible(true);
    window.setTimeout(() => setToastVisible(false), 3200);
  }

  return (
    <main className="mx-auto max-w-[1180px] px-3.5 py-[18px] text-[#49333a] sm:px-[22px] sm:py-7 sm:pb-[42px]">
      <header className="mb-6 flex flex-col items-start justify-between gap-[18px] sm:mb-[26px] lg:flex-row lg:items-center">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-[14px] bg-[#bf6f86] shadow-[0_10px_26px_rgba(191,111,134,0.2)]" aria-hidden="true">
            <svg className="h-[30px] w-[30px]" viewBox="0 0 64 64" fill="none">
              <circle cx="21" cy="22" r="7" fill="#f6b8c8" />
              <circle cx="43" cy="22" r="7" fill="#f6b8c8" />
              <circle cx="16" cy="39" r="6" fill="#f3a3b9" />
              <circle cx="48" cy="39" r="6" fill="#efd2a6" />
              <path d="M22 39c3-8 17-8 20 0 4 10-24 10-20 0Z" fill="#fff" />
            </svg>
          </div>
          <div>
            <h1 className="m-0 text-[clamp(24px,4vw,38px)] leading-[1.05] tracking-normal">泡泡爪宠物洗护</h1>
            <p className="mt-[5px] mb-0 text-sm text-[#8b737a]">洗澡、修毛、护理、除味，一次预约全搞定</p>
          </div>
        </div>
        <div className="flex items-center gap-2 whitespace-nowrap rounded-full border border-[#f6b8c8]/60 bg-white/70 px-3.5 py-2.5 text-[#a45d72] shadow-[0_8px_24px_rgba(35,49,63,0.08)]">
          <span>今日可约</span>
          <strong>12:30 - 20:00</strong>
        </div>
      </header>

      <div className="grid items-start gap-[22px] lg:grid-cols-[minmax(0,1.15fr)_360px]">
        <div>
          <section className="flex min-h-[430px] items-end overflow-hidden rounded-lg bg-[linear-gradient(90deg,rgba(82,47,58,0.64),rgba(82,47,58,0.12)),url('https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center p-[22px] text-white shadow-[0_18px_45px_rgba(128,74,91,0.12)] sm:min-h-[330px] sm:p-[30px]">
            <div className="w-full max-w-[560px]">
              <h2 className="mb-3 text-[clamp(34px,6vw,62px)] leading-[0.95] tracking-normal">干净、舒服、少等待</h2>
              <p className="m-0 max-w-[520px] text-[17px] leading-[1.7] text-white/85">根据宠物体型、毛量和敏感情况自动匹配洗护方案，预约完成后门店会预留专属洗护台。</p>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  ["45min", "小型犬基础洗护"],
                  ["1v1", "全程护理师跟进"],
                  ["98%", "回访满意度"],
                ].map(([value, label]) => (
                  <div className="rounded-lg border border-white/25 bg-white/20 p-3 backdrop-blur" key={value}>
                    <strong className="block text-[22px]">{value}</strong>
                    <span className="text-[13px] text-white/80">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className={`mt-[22px] p-[22px] ${cardShell}`}>
            <SectionHead title="店内环境" description="分区洗护动线，安静、通透、少打扰" />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {environments.map((environment) => (
                <article className="group relative min-h-[230px] overflow-hidden rounded-lg border border-[#f0dbe1] bg-[#fdeaf0] shadow-[0_12px_28px_rgba(35,49,63,0.09)]" key={environment.title}>
                  <img className="block h-full min-h-[230px] w-full object-cover contrast-[1.03] saturate-[0.98] transition duration-300 group-hover:scale-[1.04]" src={environment.image} alt={environment.alt} />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-b from-transparent to-[rgba(18,31,35,0.82)] px-4 pt-11 pb-[15px] text-white">
                    <strong className="mb-1.5 block text-[17px]">{environment.title}</strong>
                    <span className="block text-[13px] leading-normal text-white/80">{environment.description}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className={`mt-[22px] p-[22px] ${cardShell}`}>
            <SectionHead title="选择洗护套餐" description="价格会根据宠物体型微调" />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {services.map((service) => {
                const active = selectedService.name === service.name;
                return (
                  <article
                    className={`relative min-h-[170px] cursor-pointer rounded-lg border bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#f6b8c8] hover:shadow-[0_14px_32px_rgba(36,133,111,0.15)] ${
                      active ? "-translate-y-0.5 border-[#f6b8c8] shadow-[0_14px_32px_rgba(36,133,111,0.15)]" : "border-[#f0dbe1]"
                    }`}
                    key={service.name}
                    onClick={() => setSelectedService(service)}
                  >
                    {active && <span className="absolute top-2.5 right-2.5 h-2.5 w-2.5 rounded-full bg-[#bf6f86]" />}
                    <ServiceIcon icon={service.icon} />
                    <h4 className="mt-4 mb-2 text-[17px] font-bold">{service.name}</h4>
                    <p className="mb-3.5 text-[13px] leading-[1.55] text-[#8b737a]">{service.description}</p>
                    <div className="text-xl font-extrabold text-[#bf6f86]">¥{service.price} 起</div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className={`mt-[22px] p-[22px] ${cardShell}`}>
            <SectionHead title="宠物与预约信息" description="填写后右侧会实时生成预约单" />
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              <FieldLabel label="宠物昵称">
                <input className={fieldClass} value={petName} placeholder="例如：奶油" onChange={(event) => setPetName(event.target.value)} />
              </FieldLabel>
              <FieldLabel label="宠物类型">
                <select className={fieldClass} value={petType} onChange={(event) => setPetType(event.target.value as (typeof petTypes)[number])}>
                  {petTypes.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </FieldLabel>
              <FieldLabel label="联系人">
                <input className={fieldClass} value={ownerName} placeholder="您的称呼" onChange={(event) => setOwnerName(event.target.value)} />
              </FieldLabel>
              <FieldLabel label="手机号码">
                <input className={fieldClass} value={phone} placeholder="用于接收预约通知" onChange={(event) => setPhone(event.target.value)} />
              </FieldLabel>
              <FieldLabel label="预约日期">
                <input className={fieldClass} type="date" value={date} onChange={(event) => setDate(event.target.value)} />
              </FieldLabel>
              <FieldLabel label="到店门店">
                <select className={fieldClass} value={store} onChange={(event) => setStore(event.target.value)}>
                  {stores.map((storeName) => (
                    <option key={storeName}>{storeName}</option>
                  ))}
                </select>
              </FieldLabel>
              <textarea
                className={`${fieldClass} min-h-[88px] resize-y sm:col-span-2`}
                value={notes}
                placeholder="护理师备注：例如怕吹风、皮肤敏感、需要轻柔梳毛等"
                onChange={(event) => setNotes(event.target.value)}
              />
            </div>
            <div className="mt-3.5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {slots.map((slot) => (
                <button
                  className={`min-h-11 rounded-lg border px-2 py-[11px] text-[#6a4d56] ${selectedTime === slot ? "border-[#bf6f86] bg-[#fff1f5] font-extrabold text-[#a45d72]" : "border-[#f0dbe1] bg-white"}`}
                  key={slot}
                  type="button"
                  onClick={() => setSelectedTime(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
          </section>

          <section className={`mt-[22px] p-[22px] ${cardShell}`}>
            <SectionHead title="附加护理" description="可多选，费用计入预约单" />
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {addons.map((addon) => (
                <label className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-[#f0dbe1] bg-white p-3 text-[13px] font-bold text-[#6a4d56]" key={addon.name}>
                  <input
                    className="h-[18px] w-[18px] shrink-0 accent-[#bf6f86]"
                    type="checkbox"
                    checked={selectedAddons.includes(addon.name)}
                    onChange={() => toggleAddon(addon.name)}
                  />
                  {addon.name}
                  <span className="whitespace-nowrap text-[13px] font-bold text-[#8b737a]">+¥{addon.price}</span>
                </label>
              ))}
            </div>
          </section>
        </div>

        <aside className="soft-bounce overflow-hidden rounded-lg border border-[#dfe6eb]/95 bg-white/90 shadow-[0_18px_45px_rgba(128,74,91,0.12)] lg:sticky lg:top-[22px]">
          <div className="h-[168px] bg-[linear-gradient(180deg,rgba(21,40,46,0.04),rgba(21,40,46,0.42)),url('https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=900&q=80')] bg-cover bg-center" aria-hidden="true" />
          <div className="p-[22px]">
            <h3 className="mb-3 text-[22px] font-bold">预约单</h3>
            <SummaryLine label="宠物" value={`${petName.trim() || "未填写"} / ${petType}`} />
            <SummaryLine label="套餐" value={selectedService.name} />
            <SummaryLine label="时间" value={`${formatDate(date)} ${selectedTime}`} />
            <SummaryLine label="门店" value={store} />
            <SummaryLine label="附加护理" value={chosenAddons.length ? chosenAddons.map((addon) => addon.name).join("、") : "未选择"} />
            <div className="flex items-end justify-between gap-4 px-0 pt-[18px] pb-4">
              <span className="text-[13px] text-[#8b737a]">预计合计</span>
              <strong className="text-[34px] leading-none text-[#bf6f86]">¥{total}</strong>
            </div>
            <button className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border-0 bg-[#bf6f86] px-[18px] py-3.5 font-extrabold text-white transition hover:bg-[#a75e75]" type="button" onClick={confirmBooking}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              确认预约
            </button>
            {toastVisible && <div className="mt-3.5 rounded-lg bg-[#fff1f5] p-3 text-sm font-bold text-[#a45d72]">预约已生成，门店将尽快与您确认。</div>}
          </div>
        </aside>
      </div>

      <section className="mt-[22px] grid items-stretch gap-[18px] lg:grid-cols-[minmax(0,0.86fr)_minmax(320px,1.14fr)]" aria-label="门店地址">
        <div className={`${cardShell} flex min-h-[300px] flex-col justify-between gap-6 overflow-hidden p-6`}>
          <div>
            <h3 className="mb-3 text-2xl font-bold">门店地址</h3>
            <p className="m-0 text-[22px] leading-[1.35] font-black text-[#49333a] sm:text-[26px]">滨江区1210门面</p>
          </div>
          <div className="grid gap-3 text-sm text-[#8b737a]">
            <div className="flex items-start gap-2.5">
              <AddressIcon kind="pin" />
              <span>靠近社区主入口，门头为粉色招牌，到店后可直接前台登记。</span>
            </div>
            <div className="flex items-start gap-2.5">
              <AddressIcon kind="calendar" />
              <span>营业时间：10:00 - 20:00，建议按预约时间提前 10 分钟到店。</span>
            </div>
            <div className="flex items-start gap-2.5">
              <AddressIcon kind="parking" />
              <span>店门口可短停，接送服务请在附加护理中勾选。</span>
            </div>
          </div>
        </div>

        <div className="soft-map-bounce relative min-h-[300px] overflow-hidden rounded-lg border border-[#dfe6eb]/95 bg-[#fdeaf0] shadow-[0_10px_30px_rgba(35,49,63,0.08)]">
          <img className="block h-full min-h-[300px] w-full object-cover" src="/assets/pet-store-location-cartoon.png" alt="泡泡爪宠物洗护滨江区1210门面卡通地图与门店位置展示" />
          <div className="absolute bottom-[18px] left-[18px] z-10 min-w-[190px] rounded-lg border border-white/90 bg-white/90 px-3.5 py-3 shadow-[0_12px_26px_rgba(35,49,63,0.12)] backdrop-blur">
            <strong className="block text-sm">泡泡爪宠物洗护</strong>
            <span className="mt-[3px] block text-xs text-[#8b737a]">滨江区1210门面</span>
          </div>
        </div>
      </section>
    </main>
  );
}

function SectionHead({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-3.5">
      <div>
        <h3 className="m-0 text-[21px] font-bold">{title}</h3>
        <small className="text-[#8b737a]">{description}</small>
      </div>
    </div>
  );
}

function FieldLabel({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-[7px] text-[13px] font-bold text-[#6a4d56]">
      {label}
      {children}
    </label>
  );
}

function SummaryLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-[#f0dbe1] py-[11px] text-sm text-[#8b737a]">
      <span>{label}</span>
      <strong className="text-right text-[#49333a]">{value}</strong>
    </div>
  );
}
