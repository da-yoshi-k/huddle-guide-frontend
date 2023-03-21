<template>
  <div id="work">
    <div class="flex p-2 justify-center items-center">
      <div class="text-3xl text-black font-bold">使い方</div>
    </div>
    <div class="mt-4 mx-auto p-4 max-w-4xl">
      <NuxtLink to="/works" class="btn btn-primary text-yellow-100 ml-2">戻る</NuxtLink>
      <div class="my-4 mx-auto p-4 max-w-4xl bg-slate-200">
        <h1 class="text-xl font-bold mb-4">共通点探し</h1>
        <div class="mb-4">
          <h3 class="text-lg underline underline-offset-2">ワークの概要</h3>
          <div class="ml-2 mb-2">
            <p>自身の好きなことをメンバーに共有し、共通点を探すワークです。</p>
            <p>複数回行う場合や進め方に迷う場合には以下のいずれかの方針を意識して進めてみてください。</p>
            <ul class="list-decimal ml-6">
              <li>自己紹介を中心とした自身の趣味を発表し、積極的には共通点を探しに行かない。</li>
              <li>他の人が出した趣味と一致する趣味があれば、自身の好きなことを編集して共通点を積極的に探す。</li>
              <li>「好きなテレビ番組」「好きな飲食店」「好きなスポーツ」など特定の分野に絞ってその中から共通点を探す。（この場合はファシリテーターからメンバーに対して説明を行う）</li>
            </ul>
          </div>
          <h3 class="text-lg underline underline-offset-2">ワークの目安時間</h3>
          <p class="ml-2">全体で30〜50分。</p>
        </div>
        <h3 class="text-lg underline underline-offset-2">詳細な使い方</h3>
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
              <p>画面上のチャットで適宜コミュニケーションを取りましょう。（通話・チャットについては他のコミュニケーションツールを利用しても可）</p>
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
              <p>ここでは前のステップ同様、発表者を適宜切り替えても、</p>
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
