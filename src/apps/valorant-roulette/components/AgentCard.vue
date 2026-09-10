<template>
    <div
        id="card"
        :style="{
            backgroundColor: getBackgroundColor(),
            opacity: selected ? '1' : '0.5',
        }"
    >
        <img :src="agent.icon" id="icon" draggable="false"/>
    </div>
</template>

<script lang="ts">
export default {
    name: "AgentCard",
    props: ["agent", "inactive", "index", "selected"],
    methods: {
        setToInactive() {
            this.$emit("setToAvoid", this.agent.name)
        },
        getBackgroundColor() {
            if (this.inactive) {
                return "red"
            } else {
                return this.selected ? `#${this.agent.gradient[0]}` : ''
            }
        }
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
    cursor: pointer;
}

#icon {
    width: 100%;
    height: 100%;
    -webkit-user-drag: none;
    user-select: none;
    -webkit-user-select: none;
    pointer-events: none;
}
</style>