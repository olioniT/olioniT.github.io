<template>
    <div id="card" :class="selected ? 'active' : ''" :style="{background: selected ? createGradientString(agent.gradient) : ''}">
        <img :src="agent.icon" id="icon" />
    </div>
</template>

<script lang="ts">
export default {
    name: "AgentCard",
    props: ["agent", "selected"],
    methods: {
        hexToRgba(hex: String) {
            const r = parseInt(hex.substring(0, 2), 16)
            const g = parseInt(hex.substring(2, 4), 16)
            const b = parseInt(hex.substring(4, 6), 16)

            const aVal = hex.substring(6, 8)
            const a = aVal ? (parseInt(aVal, 16) / 255).toFixed(0) : 1

            return `rgba(${r}, ${g}, ${b}, ${a})`
        },
        createGradientString(colors: String[]) {
            let start = "linear-gradient(180deg, "

            colors.forEach((color: String, index: number) => {
                if (index !== (colors.length - 1)) {
                    start += `${this.hexToRgba(color)} ${((index + 1) / 4) * 100}%, `
                } else {
                    start += `${this.hexToRgba(color)} ${((index + 1) / 4) * 100}%`
                }
            })

            start += ")"
            return start
        }
    }
}
</script>

<style scoped>
#card {
    height: 250px;
    aspect-ratio: 1 / 1;
    background-color: rgb(54, 54, 54);
    border-radius: 5px;
    padding: 2.5px;
    flex-shrink: 0;
    box-shadow: 0px 5px 5px 2.5px rgb(15, 15, 15);
    transition: 0.3s;
}

#card.active {
    /* border: 4px solid white; */
    outline: 4px solid white;
    box-shadow: 0px 0px 10px 2.5px white;
    z-index: 2;
}

#icon {
    width: 100%;
    height: 100%;
}
</style>