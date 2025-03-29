"use client"
import React,{useState,useEffect,useRef} from 'react';
import Phaser from "phaser";


export default function Game() {
  const gameref  = useRef<Phaser.Game>(null);
    useEffect(()=>{
        function preload(this:Phaser.Scene){
            this.load.image('sky','/assets/sky.png');
        }
        function create(this:Phaser.Scene){
            this.add.image(this.scale.width / 2, this.scale.height / 2, "sky")
            .setOrigin(0.5, 0.5)  
            .setDisplaySize(this.scale.width, this.scale.height);
        }
        
        
        const config = {
            type: Phaser.AUTO,
            width: window.innerWidth,
            height: window.innerHeight,
            scene: {
                preload: preload,
                create: create,
                
            },
            parent:"gameContainer"
        };
        const game = new Phaser.Game(config);
        gameref.current = game;
        return ()=>{
            gameref.current?.destroy(true);
            gameref.current = null;
        }
    },[]);
  return (
    <div id = "gameContainer"></div>
  )
}
