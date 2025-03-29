"use client"
import dynamic from "next/dynamic";

const Game = dynamic(() => import("./Game/phaser"),{ssr:false,loading:()=>{ return <p>Loading</p>}});

export default function Home() {
  return (
      <main>
        <Game/>
      </main>
  )
}
