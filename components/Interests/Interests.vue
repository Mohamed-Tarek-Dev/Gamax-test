<template>
    <div class="interests bg-[#34383a] p-5 flex gap-5 flex-col rounded-[1rem]">
        <div class="interests__consoles">
            <h2 class="text-2xl font-medium text-white mb-2">Consoles</h2>
            <ul class="interests__list">
                <li v-for="console in getConsoles">
                    {{ console }}
                </li>
            </ul>
        </div>
        <div class="interests__games">
            <h2 class="text-2xl font-medium text-white mb-2">Games</h2>
            <ul class="interests__list">
                <li v-for="game in getGames">
                    {{ game.name }}
                </li>
            </ul>
        </div>
        <div class="interests__interests">
            <h2 class="text-2xl font-medium text-white mb-2">Interests</h2>
            <ul class="interests__list">
                <li v-for="interest in getInterests">
                    {{ interest }}
                </li>
            </ul>
        </div>
        <NuxtLink to="/interests" class="edit-btn">
            <Icon name="ooui:recent-changes-ltr" class="edit-icon" />
        </NuxtLink>
    </div>
</template>

<script setup>
import { useInterestsStore } from '@/stores/interests';
const interestsStore = useInterestsStore();

const { getConsoles, getGames, getInterests } = interestsStore;

</script>

<style lang="scss" scoped>
.interests {
    @apply relative;

    &__consoles {}

    &__games {}

    &__interests {}

    &__list {
        @apply flex gap-3 flex-wrap;

        li {
            @apply bg-[#3C99C0] rounded-[1rem] px-5 py-2 text-white;
        }
    }

    .edit-btn {
        background-color: rgba($color: #000000, $alpha: .5);
        @apply absolute top-0 left-0 w-full h-full rounded-[1rem] flex items-center justify-center opacity-0 invisible transition-all duration-300;

        .edit-icon {
            @apply text-white text-6xl;
        }
    }

    &:hover {
        .edit-btn {
            @apply opacity-100 visible;
        }
    }
}
</style>