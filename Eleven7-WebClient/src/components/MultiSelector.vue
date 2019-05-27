<template>
  <v-combobox
    v-model="model"
    @input="updateFilter"
    hide-selected
    :label="label"
    multiple
    small-chips
    solo
  >
    <template v-slot:selection="{ item, parent, selected }">
      <v-chip
        v-if="item === Object(item)"
        :color="`${item.color} lighten-3`"
        :selected="selected"
        label
        small
      >
        <span class="pr-2">{{ item.text }}</span>
        <v-icon small @click="parent.selectItem(item)">close</v-icon>
      </v-chip>
    </template>
  </v-combobox>
</template>

<script>
export default {
  props: ["label", "value"],
  data: () => ({
    activator: null,
    attach: null,
    colors: [
      "green",
      "purple",
      "indigo",
      "cyan",
      "teal",
      "orange",
      "red",
      "yellow",
      "pink",
      "blue",
      "brown"
    ],
    editing: null,
    index: -1,
    items: [],
    nonce: 1,
    model: [],
    output: []
  }),

  watch: {
    model(val, prev) {
      if (this.nonce == this.colors.length - 1) this.nonce = 0;
      if (val.length === prev.length) return;

      this.model = val.map(v => {
        if (typeof v === "string") {
          this.output.push(v);
          v = {
            text: v,
            color: this.colors[this.nonce]
          };
          this.nonce++;
        }
        return v;
      });
      this.$emit("input", [...this.output]);
    }
  },
  methods: {
    updateFilter() {}
  }
};
</script>
