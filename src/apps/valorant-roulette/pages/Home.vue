<template>
    <div id="home">
        <div id="roles">
            <RoleCard v-for="role in roles" :role :selected="filteredRole === role.name" @click="filterByRole(role.name)"/>
        </div>
        <div id="cards">
            <AgentCard v-for="agent, index in filteredAgents" :inactive="agent.inactive" @click="toggleAvoid(agent.name)" :selected="chosenAgent === index" :agent :index />
        </div>
        <button @click="roulette">Roulette</button>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';

import AgentCard from '../components/AgentCard.vue';
import RoleCard from '../components/RoleCard.vue';

interface Agent {
    icon: string,
    name: string,
    gradient: string[],
    role: string,
    inactive: boolean
}

interface Role {
    icon: string,
    name: string
}

export default {
    name: "Home",
    components: {AgentCard, RoleCard},
    data() {
        return {
            chosenAgent: -1,
            roles: ref<Role[]>([]),
            agents: ref<Agent[]>([]),
            filteredRole: "",
            filteredAgents: ref<Agent[]>([])
        }
    },
    async mounted() {
        try {
            const response = await fetch("https://valorant-api.com/v1/agents")

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            const apiObj = await response.json()
            const agents = apiObj.data

            agents.forEach((agent: any) => {
                this.agents.push({
                    "icon": agent.displayIcon,
                    "name": agent.displayName,
                    "gradient": agent.backgroundGradientColors,
                    "role": agent.role.displayName,
                    "inactive": false
                    
                })

                if (!this.roles.some(role => role.name === agent.role.displayName)) {
                    this.roles.push({
                        "icon": agent.role.displayIcon,
                        "name": agent.role.displayName
                    })
                }
            })

            this.filteredAgents = this.agents
        } catch (err) {
            console.error(err)
        }
    },
    methods: {
        getRandomAgentIndex(prev?: number) {
            let index = 0

            do {
                index = Math.floor(Math.random() * this.filteredAgents.length)
            } while (
                index === prev || this.filteredAgents[index]?.inactive
            )

            return index
        },
        async roulette() {
            const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
            
            for (let i = 0; i < 9; i++) {
                this.chosenAgent = this.getRandomAgentIndex()
                await sleep(100)
            }

            this.chosenAgent = this.getRandomAgentIndex()
        },
        filterByRole(role: string) {
            this.chosenAgent = -1

            if (this.filteredRole !== role) {
                this.filteredRole = role
                this.filteredAgents = this.agents.filter(agent => agent.role === role)
            } else {
                this.filteredRole = ""
                this.filteredAgents = this.agents
            }
        },
        toggleAvoid(agentName: string) {
            this.filteredAgents.forEach((agent) => {
                if (agent.name === agentName) {
                    agent.inactive = !agent.inactive
                }
            })
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
    background-color: rgb(27, 27, 27);
    gap: 2.5vh;
}

#roles {
    width: 85vw;
    height: fit-content;
    display: flex;
    justify-content: space-between;
    padding: 5px;
}

#cards {
    width: 85vw;
    height: 58.5vh;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(3, 1fr);
    padding: 5px;
    gap: 5px;
    margin-bottom: 7.5vh;
}

button {
    padding: 10px 20px;
    font-size: 28px;
    font-weight: 800;
    border-radius: 5px;
    background-color: #FF4655;
    color: white;
    position: absolute;
    bottom: 5.5vh;
}

button:hover {
    box-shadow: 0px 0px 10px 2.5px#FF4655;
}
</style>