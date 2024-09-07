<template>
    <div class="flex flex-col min-h-screen">
        <NavigationBar />
        <div class="flex-grow bg-cover bg-center" :style="{ backgroundImage: `url(${backgroundImage})` }">
            <slot></slot>
        </div>
        <Footer />
    </div>
</template>

<script setup>
import NavigationBar from '../components/NavigationBar.vue'
import Footer from '../components/Footer.vue'
import backgroundImage from '../assets/CurBack.jpg'
</script>

<style scoped></style>
