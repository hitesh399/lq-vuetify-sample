<template>
    <v-layout
        v-bind="{'justify-end': !$root.responsive, 'justify-center': $root.responsive}"
        row
        wrap
        align-center
        fill-height
    >
        <slot></slot>
    </v-layout>
</template>