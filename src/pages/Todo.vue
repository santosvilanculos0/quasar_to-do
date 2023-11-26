<script setup>
import {
  QBtn,
  QCheckbox,
  QIcon,
  QInput,
  QItem,
  QItemLabel,
  QItemSection,
  QList,
  QPage,
  useQuasar
} from 'quasar';
import { defineComponent, reactive, ref } from 'vue';
const $q = useQuasar();

const input = ref('');
const tasks = reactive([]);

const remove = index => {
  $q.dialog({
    title: 'Confirm',
    message: 'Are you sure that ou want to delete the task?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    tasks.splice(index, 1);
    $q.notify('Task deleted successfully!');
  });
};

const write = () => {
  if (input.value === '') {
    $q.notify('You must write something!');
    return;
  }

  tasks.push({ title: input.value, done: false });
  input.value = '';
};
</script>

<template>
  <QPage class="bg-grey-3 column">
    <div class="row q-pa-sm bg-primary">
      <QInput
        @keypress.enter="write"
        bg-color="white"
        class="col"
        dense
        filled
        placeholder="Add new task"
        square
        v-model="input"
      >
        <template v-slot:append>
          <QBtn @click="write" round dense flat icon="add" />
        </template>
      </QInput>
    </div>

    <QList class="bg-white" separator bordered>
      <QItem
        v-for="(task, index) in tasks"
        :key="task.title"
        @click="task.done = !task.done"
        :class="{ 'done bg-blue-1': task.done }"
        clickable
        v-ripple
      >
        <QItemSection avatar>
          <QCheckbox
            v-model="task.done"
            class="no-pointer-events"
            color="primary"
          />
        </QItemSection>

        <QItemSection>
          <QItemLabel>{{ task.title }}</QItemLabel>
        </QItemSection>

        <QItemSection v-if="task.done" side>
          <QBtn
            @click.stop="remove(index)"
            color="primary"
            dense
            flat
            icon="delete"
            round
          />
        </QItemSection>
      </QItem>
    </QList>

    <div
      v-if="!tasks.length"
      class="no-tasks absolute-center text-h5 text-primary text-center"
    >
      <QIcon name="check" class="text-h5" color="primary" />
      There are no tasks to display!
    </div>
  </QPage>
</template>

<style lang="scss">
.done {
  .q-item__label {
    text-decoration: line-through;
    color: #bbb;
  }
}
.no-tasks {
  opacity: 0.5;
}
</style>
