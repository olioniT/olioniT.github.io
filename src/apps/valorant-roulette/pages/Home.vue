<template>
    <div id="home">
        <div id="pointer"></div>
        <div id="container" :style="{transform: `translateX(-${offset}px)`}">
            <AgentCard v-for="agent, index in agents" :selected="chosenAgent === (index)" :agent />
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
            itemSize: 255,
            itemDistance: 255 + 5,

            offset: 0,
            chosenAgent: 99,
            agents: ref<Agent[]>([]),
        }
    },
    methods: {
        roulette() {
            const containerWidth = window.innerWidth
            const selectedIndex = Math.floor(Math.random() * this.agents.length)
            
            this.offset = (selectedIndex * this.itemDistance) - (containerWidth / 2) + (this.itemSize / 2)
            this.chosenAgent = selectedIndex
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
    top: 23vh;
    clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
}

#container {
    width: 100vw;
    display: flex;
    gap: 5px;
    height: fit-content;
    transform: translateX(0);
    transition: transform 6s cubic-bezier(.15, 1, .9, 1);

    /* width: 100vw;
    height: fit-content;
    display: flex;
    justify-content: center;
    align-content: center;
    gap: 5px;
    overflow: hidden; */
}

button {
    padding: 10px 20px;
    font-size: 28px;
    font-weight: 800;
    border-radius: 5px;
    background-color: #FF4655;
    color: white;
    transition: 0.3s;
}

button:hover {
    box-shadow: 0px 0px 10px 2.5px#FF4655;
}

@keyframes rightToLeft {
    0% { right: 190px; }
    100% { right: -100; }
}
</style>