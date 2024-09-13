<template>
    <div>
<!--        <LayoutBg />-->
        <LayoutMouseFollower/>
        <div>
            <LayoutHeader />
            <main class="pt-32">
                <slot></slot>
            </main>
        </div>
    </div>
</template>