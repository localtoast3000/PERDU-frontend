<template>
    <button class="btn" @click="handleClick">{{label}}</button>
</template>

<script>
    export default {
        props: {
            label: String,
        },
        methods: {
            handleClick(e){
                console.log(e)
            }
        }
    }
</script>

<style scoped>
    .btn {
        background-color: red;
        border: 1px solid black;
    }
</style>