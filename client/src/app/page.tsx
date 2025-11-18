"use client";

import { useEffect, useState } from "react";

type MealType = "朝食" | "昼食" | "おやつ" | "夕食" | "夜食";

function getMealType(date: Date): MealType {
  const hour = date.getHours();

  if (hour >= 5 && hour < 10) return "朝食";
  if (hour >= 10 && hour < 15) return "昼食";
  if (hour >= 15 && hour < 18) return "おやつ";
  if (hour >= 18 && hour < 23) return "夕食";
  return "夜食";
}

function getComment(meal: MealType): string {
  switch (meal) {
    case "朝食":
      return "ちゃんと朝ごはん食べた？ 起きてるだけでえらい。";
    case "昼食":
      return "お昼！ 作業の前にとりあえず糖分入れとこ。";
    case "おやつ":
      return "おやつの時間です。カロリーはゼロということにしておく。";
    case "夕食":
      return "夕飯タイム。今日も一日おつかれ。";
    case "夜食":
      return "それ本当に今食べる？ 明日の自分に聞いてからでも遅くない。";
    default:
      return "";
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
    <main className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-50">
      <div className="max-w-md w-full px-6 py-8 rounded-2xl bg-slate-800 shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">
          今は何ごはんタイム？
        </h1>

        {meal && (
          <>
            <p className="text-center text-lg mb-2">いまは…</p>
            <p className="text-center text-4xl font-extrabold mb-4">
              {meal}
            </p>
          </>
        )}

        {timeString && (
          <p className="text-center text-sm text-slate-300 mb-4">
            現在時刻：{timeString}
          </p>
        )}

        {meal && (
          <p className="text-center text-sm text-slate-200">
            {getComment(meal)}
          </p>
        )}
      </div>
    </main>
  );
}