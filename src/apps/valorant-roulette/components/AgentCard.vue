<template>
    <div id="card" :class="selected ? 'active' : 'inactive'" :style="{backgroundColor: selected ? `#${agent.gradient[0]}` : ''}" >
        <img :src="agent.icon" id="icon" />
    </div>
</template>

<script lang="ts">
export default {
    name: "AgentCard",
    props: ["agent", "index", "selected"],
    methods: {

    }
}
</script>

<style scoped>
#card {
    width: 100%;
    height: 100%;
    background-color: rgb(54, 54, 54);
    border-radius: 2.5px;
    transition: 0.15s;
}

#card.active {
    background-color: white;
    /* border: 4px solid white; */
    /* outline: 4px solid white; */
    /* box-shadow: 0px 0px 10px 2.5px white; */
}

#card.inactive {
    opacity: 0.5;
}

#icon {
    width: 100%;
    height: 100%;
}
</style>