<template>
  <div class="text">
        <ul class="ant-comment-actions" v-if="$slots['test']">
          <li
            v-for="(item, index) of $slots['test']()"
            :key="'comment-action-' + index"
          >
          
            <component :is="item">{{$slots['test']()}}</component>
          </li>
        </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>