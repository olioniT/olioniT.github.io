<template>
    <div id="home">
        <div id="pointer"></div>
        <div
            id="cards"
            ref="cards"
            @transitionend="onRouletteFinish"
            :style="{transform: `translateX(${offset}px)`, transition: `transform ${duration}s cubic-bezier(.04,.44,.36,.98)`}"
        >
            <AgentCard v-for="agent, index in agents" :selected="chosenAgent === (index)" :agent :index />
        </div>
        <button @click="roulette">Roulette</button>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';

import AgentCard from '../components/AgentCard.vue';

interface Agent {
    icon: String,
    name: String,
    gradient: String[]
}

export default {
    name: "Home",
    components: {AgentCard},
    data() {
        return {
            offset: 0,
            duration: 6,

            itemGap: 15,
            itemIndex: 0,
            itemSize: 400,
            itemDistance: 415,
            
            chosenAgent: -1,
            agents: ref<Agent[]>([]),
        }
    },
    methods: {
        centreRoulette() {
            const containerWidth = window.innerWidth

            this.duration = 0
            this.offset = ((containerWidth / 2) - (this.itemDistance / 2)) - (this.itemDistance * 3)
        },
        roulette() {
            const containerWidth = window.innerWidth
            const selectedIndex = Math.floor(Math.random() * this.agents.length)

            let distance = Math.abs(this.itemIndex - this.chosenAgent)

            this.duration = Math.min(distance, this.agents.length) / this.agents.length + (6 - 1) + 1
            this.offset = ((containerWidth / 2) - (this.itemDistance / 2)) - (this.itemDistance * selectedIndex)
            
            this.itemIndex = selectedIndex 
        },
        onRouletteFinish(event: TransitionEvent) {
            if (event.propertyName !== "transform") return
            
            this.chosenAgent = this.itemIndex
        }
    },
    async mounted() {
        try {
            const stripLength = 60
            const response = await fetch("https://valorant-api.com/v1/agents")

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            const apiObj = await response.json()
            const agents = apiObj.data

            for (let i = 0; i < stripLength; i++) {
                let agent = agents[Math.floor(Math.random() * agents.length)]

                this.agents.push({
                    "icon": agent.displayIcon,
                    "name": agent.displayName,
                    "gradient": agent.backgroundGradientColors
                })
            }

            this.centreRoulette()
        } catch (err) {
            console.error(err)
        }
    }
}
</script>

<style>
#home {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5vh;
    background-color: rgb(27, 27, 27);
    overflow: hidden;
    position: relative;
}

#pointer {
    width: 30px;
    height: 30px;
    position: absolute;
    background-color: #FF4655;
    z-index: 1;
    top: 19vh;
    clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
}

#cards {
    width: 100vw;
    height: 80vh;
    display: flex;
    align-items: center;
    gap: 15px;
    /* transition: transform 6s cubic-bezier(.15, 1, .53, .98); */
}

button {
    padding: 10px 20px;
    font-size: 28px;
    font-weight: 800;
    border-radius: 5px;
    background-color: #FF4655;
    color: white;
    transition: 0.3s;
    position: absolute;
    bottom: 17vh;
}

button:hover {
    box-shadow: 0px 0px 10px 2.5px#FF4655;
}
</style>