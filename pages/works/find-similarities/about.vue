<template>
  <div id="work">
    <div class="flex p-2 justify-center items-center">
      <div class="text-3xl text-black font-bold">使い方</div>
    </div>
    <div class="mt-4 mx-auto p-4 max-w-4xl">
      <NuxtLink to="/works" class="btn btn-primary text-yellow-100 ml-2">戻る</NuxtLink>
      <div class="my-4 mx-auto p-4 max-w-4xl bg-slate-200">
        <h1 class="text-xl font-bold">共通点探し</h1>
        <div class="hero">
          <div class="hero-content flex-col md:flex-row-reverse">
            <img src="https://huddle-guide-public.s3.ap-northeast-1.amazonaws.com/find-similarities/01_standby_screen.png"
              alt="待機画面" class="w-80">
            <div>
              <h1 class="text-xl font-bold">1. メンバーの参加を待機</h1>
              <p>ワークを開始し、待機画面でメンバーの参加を待ちます。</p>
              <p>メンバーはホーム画面等から現在開催中のワークに参加します。ある程度メンバーが参加したらワークを開始します。</p>
            </div>
          </div>
        </div>
        <div class="hero">
          <div class="hero-content flex-col md:flex-row-reverse">
            <img
              src="https://huddle-guide-public.s3.ap-northeast-1.amazonaws.com/find-similarities/02_work_post_modal.png"
              alt="投稿画面" class="w-80">
            <div>
              <h1 class="text-xl font-bold">2. 好きなことを投稿</h1>
              <p>ワーク画面に遷移した後、各ユーザーが最大3つまで好きなことを投稿します。</p>
              <p>また、それぞれの好きなことに対してどの程度好きか、習熟しているかを選択できます。</p>
            </div>
          </div>
        </div>
        <div class="hero">
          <div class="hero-content flex-col md:flex-row-reverse">
            <img src="https://huddle-guide-public.s3.ap-northeast-1.amazonaws.com/find-similarities/03_after_post.png"
              alt="投稿後" class="w-80">
            <div>
              <h1 class="text-xl font-bold">3. 全員の投稿を待機</h1>
              <p>各ユーザーが投稿するとそれぞれの好きなことが表示されます。</p>
              <p>また、好きなことが一致した投稿には一致したユーザーのアバターが表示されます。</p>
              <p>全員の投稿が完了したらファシリテーターが「発表に移る」ボタンを押下し、ステップを変更します。</p>
            </div>
          </div>
        </div>
        <div class="hero">
          <div class="hero-content flex-col md:flex-row-reverse">
            <img
              src="https://huddle-guide-public.s3.ap-northeast-1.amazonaws.com/find-similarities/04_presentation_and_chat.png"
              alt="発表画面" class="w-80">
            <div>
              <h1 class="text-xl font-bold">4. 順番に発表</h1>
              <p>その後、発表者を順次切り替えて、好きなことを発表していきます。</p>
              <p>画面上のチャットで適宜コミュニケーションを取りましょう。（他のコミュニケーションツールを利用しても可）</p>
            </div>
          </div>
        </div>
        <div class="hero">
          <div class="hero-content flex-col md:flex-row-reverse">
            <img src="https://huddle-guide-public.s3.ap-northeast-1.amazonaws.com/find-similarities/05_smalltalk.png"
              alt="雑談画面" class="w-80">
            <div>
              <h1 class="text-xl font-bold">5. 雑談</h1>
              <p>「雑談に移る」ボタンを押下し、ステップを変更します。</p>
              <p>発表フェーズで聞けなかったことや更に話したいことがあればメンバーに聞きましょう。</p>
              <p>雑談が一段落したら「ワークを終了する」ボタンを押下し、ワークを終了します。</p>
            </div>
          </div>
        </div>
        <div class="hero">
          <div class="hero-content flex-col md:flex-row-reverse">
            <img
              src="https://huddle-guide-public.s3.ap-northeast-1.amazonaws.com/find-similarities/06_complete_work_screen.png"
              alt="終了画面" class="w-80">
            <div>
              <h1 class="text-xl font-bold">6. ワーク終了</h1>
              <p>ワーク終了画面でチーム内で見つかった共通点を振り返ります。</p>
            </div>
          </div>
        </div>
      </div>
      <NuxtLink to="/works" class="btn btn-primary text-yellow-100 ml-2">戻る</NuxtLink>
    </div>
  </div>
</template>
