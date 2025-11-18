"use client";

import { useEffect, useState } from "react";

type MealType = "朝食" | "昼食" | "おやつ" | "夕食" | "夜食";

function getMealType(date: Date): MealType {
  const hour = date.getHours();
  if (hour >= 5 && hour < 12) return "朝食";
  if (hour >= 12 && hour < 18) return "昼食";
  if (hour >= 18 && hour < 21) return "夕食";
  return "夜食";
}

function getComment(meal: MealType): string {
  switch (meal) {
    case "朝食":
      return "今日も一日がんばりましょう";
    case "昼食":
      return "午後も無理せずいきましょう";
    case "おやつ":
      return "ほどほどにね";
    case "夕食":
      return "一日おつかれさまです";
    case "夜食":
      return "今食べるくらいなら明日早起きして朝食を食べましょう";
  }
}

export default function HomePage() {
  const [now, setNow] = useState<Date | null>(null);
  const [meal, setMeal] = useState<MealType | null>(null);

  useEffect(() => {
    const d = new Date();
    setNow(d);
    setMeal(getMealType(d));
  }, []);

  const timeString =
    now &&
    new Intl.DateTimeFormat("ja-JP", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(now);

  return (
    <main className="min-h-screen w-full flex flex-col items-center pt-20">
      
      {/* 時刻 */}
      <p className="text-3xl mb-16 text-center">
        {timeString}
      </p>

      {/* 見出し */}
      <p className="text-2xl mb-10">
        現在の食事区分は……
      </p>

      {/* n食です（横並び） */}
      <div className="relative w-full flex justify-center mb-32">
        {/* 中央に大きな「n食」 */}
        <p className="text-6xl font-bold text-center">{meal}</p>

        {/* 「n食」の右側に小さく「です」を付ける */}
        <p className="text-2xl absolute top-1/2 translate-y-[-50%] ml-[calc(50%+2rem)]">
          です
        </p>
      </div>

      {/* コメント（画面下寄り） */}
      <p className="text-xl mt-auto mb-16 text-center px-4 leading-relaxed">
        {meal && getComment(meal)}
      </p>

    </main>
  );
}
