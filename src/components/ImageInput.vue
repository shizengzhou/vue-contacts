<template>
  <div v-bind:style="style">
    <input type="hidden" v-bind:name="name" v-bind:value="value">
    <input type="file" class="input-file" v-on:change="handleFileChange">
  </div>
</template>

<script>
const readFileAsDataURL = file =>
  new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = event => {
      resolve(event.target.result);
    };
    reader.readAsDataURL(file);
  });

const resizeImage = (imageURL, canvas, maxHeight) =>
  new Promise(resolve => {
    const image = new Image();
    image.onload = () => {
      const context = canvas.getContext('2d');

      if (image.height > maxHeight) {
        image.width *= maxHeight / image.height;
        image.height = maxHeight;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0, image.width, image.height);

      resolve(canvas.toDataURL('image/jpeg'));
    }

    image.src = imageURL;
  });

export default {
  name: 'ImageInput',
  props: ['name', 'maxHeight'],
  data: function () {
    return {
      value: '',
      canvas: null
    }
  },
  computed: {
    style: function () {
      const style = {
        position: 'relative'
      };

      if (this.value) {
        style.backgroundImage = `url(${this.value})`;
        style.backgroundRepeat = 'no repeat';
        style.backgroundPosition = 'center';
        style.backgroundSize = 'cover';
      }

      return style;
    }
  },
  mounted: function () {
    this.canvas = document.createElement('canvas');
  },
  methods: {
    handleFileChange: function (e) {
      const file = e.target.files[0];
      if (file && file.type.match(/^image\//)) {
        readFileAsDataURL(file).then(originalURL => {
          resizeImage(originalURL, this.canvas, this.maxHeight).then(url => {
            this.value = url;
          });
        });
      }
    }
  }
};
</script>

<style scoped>
.input-file {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
</style>
