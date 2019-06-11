<template>
  <v-combobox
    v-model="output"
    hide-selected
    :label="label"
    multiple
    small-chips
    solo
    hint="Maximum of 5 tags"
  >
    <!-- <template v-slot:selection="{ item, parent, selected }">
      <v-chip
        v-if="item === Object(item)"
        :color="`${item.color} lighten-3`"
        :selected="selected"
        label
        small
      >
        <span class="pr-2">{{ item.text }}</span>
        <v-icon small @click="parent.selectItem(item);">close</v-icon>
      </v-chip>
    </template> -->
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
    output(val, prev) {
    //   if (this.nonce == this.colors.length - 1) this.nonce = 0;
    //   if (val.length === prev.length) return;
    //     else if(val.length < prev.length){
    //         console.log("An item has been removed")
    //     }
    //   this.model = val.map(v => {
    //     if (typeof v === "string") {
    //       this.output.push(v);
    //       v = {
    //         text: v,
    //         color: this.colors[this.nonce]
    //       };
    //       this.nonce++;
    //     }
    //     return v;
    //   });

        if (val.length > 5) {
        //   this.$nextTick(() =>{})
            this.model.pop()
        }
        this.emitVal();
      
    },
    value(val, prev){
        console.log("watcher val : "+val)
        if (val.length == this.output.length) return;
        else{
            console.log("val from outside")
            this.output = val;
        }
        // else{
        //     console.log("change from outside")
        //     this.output = val;
        //     for(var i = 0; i < this.model.length; i++){
        //         let tmp = this.model[i].text
        //         let found = false;
        //         let j = 0;
        //         while(j < val.length && !found){
        //             if(val[j] == tmp){
        //                 console.log("Splicing item :" + i + ""+this.model[i].text)
        //                 this.model.splice(i, 1);
        //                 found = true;
        //             }
        //             j++;
        //         }
        //     }
            // console.log(JSON.stringify(this.model))
            // console.log("output :" +this.output)
        // } 
    },
  },
  methods : {
        emitVal: function(){
            console.log("Emitting "+ this.output)
            this.$emit("input", this.output);
        }
    }
};
</script>
