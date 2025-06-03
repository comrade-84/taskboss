<template>
    <div>
<button :type="btnType" class="btn btn-primary " @click="handleClick">{{ btnText }}</button>
    </div>
</template>

<script>
    export default {
        props:[
            'btnText',
            'btnType'
        ],
        methods: {
            handleClick(){
                this.$emit('button-clicked');
            }
        }
        
    }
</script>

<style scoped>

</style>