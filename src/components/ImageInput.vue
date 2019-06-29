<template>
  <div v-bind:style="style">
    <input type="hidden" v-bind:name="name" v-bind:value="inputValue">
    <input type="file" class="input-file" v-on:change="handleFileChange">
  </div>
</template>

<script>
import { value, computed, onMounted } from 'vue-function-api';

export default {
  name: 'ImageInput',
  props: ['name', 'maxHeight'],
  setup(props, context) {
    const inputValue = value('');
    const canvas = value(null);

    const style = computed(() => {
      const styleObj = {
        position: 'relative'
      };

      if (inputValue.value) {
        styleObj.backgroundImage = `url(${inputValue.value})`;
        styleObj.backgroundRepeat = 'no repeat';
        styleObj.backgroundPosition = 'center';
        styleObj.backgroundSize = 'cover';
      }

      return styleObj;
    });

    onMounted(() => {
      canvas.value = document.createElement('canvas');
    });

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

    const handleFileChange = e => {
      const file = e.target.files[0];
      if (file && file.type.match(/^image\//)) {
        readFileAsDataURL(file).then(originalURL => {
          resizeImage(originalURL, canvas.value, context.maxHeight)
            .then(url => { inputValue.value = url; });
        });
      }
    };

    return {
      inputValue,
      canvas,
      style,
      handleFileChange
    };
  },
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
