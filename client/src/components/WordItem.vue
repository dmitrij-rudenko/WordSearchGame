<template>
  <div class="word-item" :class="{ error: !status }">
    <div class="row middle-xs between-xs">
      <div class="user row middle-xs">
        <div class="img-box">
          <img src="../assets/img/pic.png" alt="userpic" />
        </div>
        <p class="username">{{ userName }}</p>
      </div>
      <div class="word-box">
        <p class="word">{{ word }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WordItem",
  props: {
    userName: {
      type: String
    },
    word: {
      type: String
    },
    status: {
      type: Boolean
    }
  }
};
</script>

<style lang="scss" scoped>
.word-item {
  background-color: var(--lightpurple);
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 14px;
  animation: fadeIn 0.2s;

  &.error {
    background-color: var(--grey);

    .user {
      .img-box {
        img {
          opacity: 0;
        }
      }
      p.username {
        visibility: hidden;
      }
    }
    .word-box {
      background-color: var(--lightgrey);
      .word {
        visibility: hidden;
      }
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}

.user {
  .img-box {
    width: 40px;
    height: 40px;
    overflow: hidden;
    border-radius: 100%;
    background-color: var(--lightgrey);
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  p.username {
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    color: #fff;
  }
}

.word-box {
  background: rgba(0, 0, 0, 0.25);
  mix-blend-mode: normal;
  border-radius: 6px;
  .word {
    color: #fff;
    font-weight: bold;
    font-size: 16px;
    line-height: 27px;
    text-transform: uppercase;
    padding: 2px 7px;
  }
}
</style>
