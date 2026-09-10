<template>
    <div id="card">
        <img :src="role.icon" id="icon" :style="{opacity: selected ? '1' : '0.5'}">
    </div>
</template>

<script lang="ts">
export default {
    name: "RoleCard",
    props: ["role", "selected"]
}
</script>

<style scoped>
#card {
    height: 50px;
    aspect-ratio: 1 / 1;
}

#icon {
    width: 100%;
    height: 100%;
    cursor: pointer;
    transition: 0.15s;
}
</style>