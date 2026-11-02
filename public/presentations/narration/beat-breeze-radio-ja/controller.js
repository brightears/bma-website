(() => {
  "use strict";

  const CONTROLLER_URL =
    document.currentScript?.src ||
    new URL(
      "./narration/beat-breeze-radio-ja/controller.js",
      window.location.href,
    ).href;
  const LANGUAGE = document.documentElement.lang.toLowerCase();
  const LOCALE = LANGUAGE.startsWith("ko")
    ? "ko"
    : LANGUAGE.startsWith("ja")
      ? "ja"
      : "ar";
  const MANIFEST_URL = new URL(
    "manifest.json",
    CONTROLLER_URL,
  ).href;
  const DISCOVERY_MS = 9500;
  const INVITATION_MS = 9000;
  const INVITATION_SESSION_KEY =
    `beat-breeze-narration-invitation-seen-${LOCALE}`;
  const ADVANCE_DELAY_MS = 650;
  const LOCAL_FALLBACK_MANIFEST = {"version":4,"deck":"beat-breeze","presentation":"beat-breeze-radio-ja","status":"official","ready":true,"generatedAt":"2026-11-02","releaseId":"2026-11-02-radio-all-1","publicationStatus":"Official 17-slide Radio presentation. AI transcript QA and assistant review; native-speaker feedback remains welcome.","coverage":{"slideIndexes":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],"behaviorAfterLastClip":"replay-from-start","manualNavigation":"restart-current-slide-when-narration-is-on"},"source":{"englishDeckPath":"public/presentations/beat-breeze.html","englishDeckSha256":"7a8972251c7183d2940102b9cae1690f374a5c82ecac1c2f70d243e5d1553c46","officialDeckPath":"public/presentations/beat-breeze-ja.html","officialDeckSha256":"ba97c12b1c3d957d7e67ce448c5468f78e347e285db6fabc957336588ddf90b8","scriptPath":"public/presentations/narration/beat-breeze-ja/script.json","scriptSha256":"31743e2eefae69ffdeeb63d1790527cb44550cec17c79f631079ab70ce19ae79","copyPath":"public/presentations/narration/beat-breeze-ja/copy.json","copySha256":"e3dff0c89b82887b57ce69607a305fd0e54b05a09c6816b9329e030b79593760"},"voice":{"provider":"google-gemini","model":"gemini-3.1-flash-tts-preview","name":"Sulafat","apiRevision":"2026-05-20","performance":{"name":"Maya","role":"施設運営をよく理解した、温かくプロフェッショナルなBeat Breezeの製品担当者","scene":"施設責任者との自然な対話の中で、表示中のスライドを案内する製品紹介","style":"親しみやすく、自信があり、実務的。スライドを読み上げたり広告調にしたりせず、Beat Breezeが運営をどう支えるかをお客様が理解できるように説明します。","pacing":"要点の間に短い間を置く、落ち着いた自然なテンポ。製品名は明瞭に、強調しすぎず発音します。"}},"processing":{"highpassHz":65,"loudnessTargetLufs":-18,"truePeakTargetDbtp":-3,"sampleRateHz":48000,"channels":1,"format":"MP3","bitRateKbps":128},"totalDurationSeconds":878.72,"slides":[{"index":1,"id":"01-title","label":"表紙","src":"../beat-breeze-ja/audio/20260903-e4ca5859bf68/01-title.mp3","text":"こんにちは。Beat Breezeをご覧いただく時間をありがとうございます。このプラットフォームは、とてもシンプルな約束から始まりました。施設のそれぞれの空間に、いつでも適切な音楽を届けることです。ただし、今日ご紹介するBeat Breezeは、それよりずっと広いものになっています。今では、音楽、スクリーン、音声アナウンス、そしてそれらを支えるコンテンツを、ひとつのプラットフォームで複数の空間にわたって管理できます。つまり、これは単なる音楽プレーヤーの紹介ではありません。施設でお客様が触れるメディア体験全体を、どのように作り、運用できるかをご覧いただきます。","visualCoverage":["オールインワンの空間体験プラットフォーム","音楽、スクリーン、アナウンス、コンテンツ","すべての空間をひとつのプラットフォームで運用"],"transcriptSha256":"4014d73ef340d621406230e726c4bafa394c401fbd4c305a44888257c1a16bf7","audioSha256":"a4c309201817e17ecb6bd53e7bb22970ad2acb76e12dc216721a1203474ca95c","durationSeconds":46.08,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.53,"truePeakDbtp":-3.36,"loudnessRangeLu":2,"thresholdLufs":-29.15,"targetOffsetLu":0.18,"cached":false},{"id":"02-one-platform-many-jobs","label":"ひとつのプラットフォーム、多彩な機能","text":"このスライドは、プラットフォーム全体の地図としてご覧ください。左側は音楽とオートメーションです。ゾーンごとのライセンス済み音楽、一日の流れに合わせた自動スケジュール、AI Music Directorの提案、そして通信が切れても続く再生が含まれます。中央はコンテンツ制作です。Composeはオリジナル音楽を作り、Content Studioは画像や動画を制作し、TV Channelsはそれをスクリーンへ配信します。多言語アナウンスもここから作れます。アナウンスが個別のメッセージを伝えるのに対し、Radioはホストが進行する継続的な放送を届けます。右側は運営です。すべての拠点、ゾーン、メンバー、プレーヤーをひとつのダッシュボードで管理し、Brand Lockでブランド基準を守れます。自社で運用することも、BMAsiaに音楽設計と管理を任せることもできます。では、中心となる音楽から見ていきましょう。","index":2,"src":"audio/20261102-radio-2c36c8b399f55f89/02-one-platform-many-jobs.mp3","transcriptSha256":"9a04c4d153eafacba8e7ee7c8d77d3ed201c08d8b27ca9e36e669c54332e56c9","audioSha256":"27a4b596c06c1740746b694b1fc17b6fd5aba97ae4e93cd3d6c04b8bc3493e55","durationSeconds":65.92,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.49,"truePeakDbtp":-3.4},{"index":3,"id":"03-music-that-runs-itself","label":"自動で運用される音楽","src":"../beat-breeze-ja/audio/20260903-e4ca5859bf68/03-music-that-runs-itself.mp3","text":"Beat Breezeの中心は、スタッフが常に操作しなくても、一日の運営リズムに沿って音楽が動く仕組みです。ロビー、バー、スパ、レストランにそれぞれ異なる音楽の個性を持たせながら、本部はひとつのダッシュボードから全拠点を確認できます。朝は穏やかに、ランチは活気を高め、夜は温かく、といった流れを一度設定すれば、時間帯ごとに自動で切り替わります。ビジネス利用権を含む音楽カタログは継続的に増え、求める雰囲気を文章で伝えるだけで、アシスタントが適切なプレイリストを組むこともできます。インターネットが不安定になっても、現地のプレーヤーは音楽を続けるよう設計されています。","visualCoverage":["ゾーンごとの音楽","スケジュールと時間帯","オフライン再生","ライセンス済みカタログとAIによるプレイリスト支援"],"transcriptSha256":"b5a1f86fae2f14eebec0fea8b942c386ae8040c8f273c114ad7202b9e07741fb","audioSha256":"757d9eebbb5bdd6caa99bba0cc8ae76477591ed8822d281645849176d65a4761","durationSeconds":48.12,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.51,"truePeakDbtp":-3.36,"loudnessRangeLu":4,"thresholdLufs":-28.81,"targetOffsetLu":0.12,"cached":false},{"index":4,"id":"04-automations","label":"オートメーション","src":"../beat-breeze-ja/audio/20260903-e4ca5859bf68/04-automations.mp3","text":"スケジュールが時刻に合わせて音楽を変えるのに対し、オートメーションは施設で実際に起きていることへ反応します。深夜には音量を自動で下げ、朝の穏やかさからランチの活気、夜の落ち着きへエネルギーを変えられます。雨の日や気温が上がったときには、より温かい、あるいは涼やかな印象の音楽へ切り替えられます。人数カウンターやPOSデータを接続すれば、混雑時に自然と活気を上げることも可能です。礼拝時刻、時間帯、祝祭シーズン、特別な日も同じ仕組みで扱います。用意されたルールを選ぶことも、独自のルールを作ることもでき、礼拝時刻の一時停止など重要な処理は通信がなくても続きます。","visualCoverage":["音量と時間帯別エネルギーの自動調整","天候と気温への反応","混雑度またはPOSによる起動","礼拝時刻と季節イベント","オフラインでも続く自動処理"],"transcriptSha256":"e31181dd1de58f61d49f313760bc4ea53fa1ca3cf8f93f20523f082d92eaedc4","audioSha256":"73d1dbbf6f9c63885b801b7acbb9e12f9ee01e099e9c6b3bbcb785a8b111589c","durationSeconds":47.28,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.44,"truePeakDbtp":-3.81,"loudnessRangeLu":2.1,"thresholdLufs":-28.77,"targetOffsetLu":0.21,"cached":false},{"index":5,"id":"05-your-music-director","label":"Music Director","src":"../beat-breeze-ja/audio/20260903-e4ca5859bf68/05-your-music-director.mp3","text":"Music Directorは、Beat Breezeに組み込まれた先回り型のAIキュレーターです。毎晩それぞれのゾーンを確認し、改善する理由があるときだけ、週に最大三件まで提案します。画面の例で大切なのは、提案だけでなく、その根拠となるデータと理由も示されることです。採用するかは運営者が決め、すべての変更は元に戻せます。時間がたつと、よくスキップされる曲、音量の調整、チームが残した選択など、実際の行動から各ゾーンを学びます。季節のイベントも前もって準備できます。売上や来場者データをつなげれば、音楽を変える前と後の結果も比較でき、感覚だけに頼らず判断できます。","visualCoverage":["毎晩すべてのゾーンを確認","数を絞った根拠付きの提案","実際の運営行動から学習","季節イベントを事前に準備","変更前後の効果測定"],"transcriptSha256":"0d6618d2c3c0542634a8cb0b20573a046cdd73153c83d4392fc6c63baead4041","audioSha256":"24df8fe6c0fd680880a40131acfcd13899045320717ac2125978d13f9827ec00","durationSeconds":46.92,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.58,"truePeakDbtp":-3.41,"loudnessRangeLu":3.8,"thresholdLufs":-29.04,"targetOffsetLu":0.59,"cached":false},{"index":6,"id":"06-compose","label":"Compose","src":"../beat-breeze-ja/audio/20260903-e4ca5859bf68/06-compose.mp3","text":"Composeでは、既存の音楽を選ぶところから一歩進み、自分たちの音楽を作れます。画面にあるキャンドルディナーの例のように、求める場面を自然な言葉で説明すると、Beat Breezeがその瞬間のためのオリジナルトラックを生成します。最初の結果を完成版にする必要はありません。もう一文加えて、雰囲気、テンポ、楽器、ボーカルを調整できます。施設にとっての価値は、AIが一曲を作れることだけではありません。誰もが共有する一般的なプレイリストではなく、キャンペーン、空間、サービス時間に合わせた独自のサウンドアイデンティティを育てられることです。","visualCoverage":["一文から作るオリジナル音楽","施設固有のクリエイティブブリーフ","会話しながら調整"],"transcriptSha256":"630997f7b6ecaba8b124776ab2272e338eb170df8f7a1ce3f8037537d390563c","audioSha256":"c58a75e3672142dcf086d32ce5f1a119c06e5215f6f27cb4e06a524d5e73add5","durationSeconds":49.44,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.44,"truePeakDbtp":-3.99,"loudnessRangeLu":5.3,"thresholdLufs":-29.13,"targetOffsetLu":0.38,"cached":false},{"index":7,"id":"07-studio-and-screens","label":"Studioとスクリーン","src":"../beat-breeze-ja/audio/20260903-e4ca5859bf68/07-studio-and-screens.mp3","text":"同じ考え方はビジュアルコンテンツにも広がります。Content Studioでは、施設が日常的に必要とするSNS投稿、販促ポスター、短い動画、デジタルサイネージ、ループ映像を、ロゴやブランドカラーに合わせて作れます。TV Channelsは、編集画面からお持ちのスクリーンへコンテンツを直接配信します。ロビーの画面では今夜の企画とそのゾーンの音楽を組み合わせ、スパでは穏やかなブランド映像を流し、ホテルでは同じチャンネルを客室テレビまで広げられます。制作ツールと配信の仕組みがひとつの場所にあるため、別のデジタルサイネージ事業として管理する必要がありません。","visualCoverage":["Content Studioの制作形式","ブランドに合わせたデザイン","TV Channelsでの配信","ホテル客室TV向けコンテンツ"],"transcriptSha256":"ef3b4d7aa461bee68b4000e7abf57e5d720d7054a47342b15593fac69e62f77a","audioSha256":"fe7a0155a716c0b65662ffad56bac47dc68a3e41304f28c4a3cee01a7860b910","durationSeconds":45.24,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.56,"truePeakDbtp":-3.4,"loudnessRangeLu":3.3,"thresholdLufs":-29.18,"targetOffsetLu":0.28,"cached":false},{"index":8,"id":"08-announcements","label":"音声アナウンス","src":"../beat-breeze-ja/audio/20260903-e4ca5859bf68/08-announcements.mp3","text":"ここでは、施設体験に声を加えます。文章を入力し、言語と声を選び、時間を設定すると、アナウンスが音楽の上に自然に流れます。ハッピーアワー、ラストオーダー、歓迎メッセージ、運営上のお知らせなどに使えます。画面の三つの例は、言語ごとに録音スタジオやナレーターを手配せず、ひとつの施設が複数の言語で案内できることを示しています。同じツールで、声と音楽を組み合わせたプロフェッショナルな電話保留音も作れます。音楽と、その周りにあるメッセージを、同じ場所で管理できるということです。","visualCoverage":["多言語の施設内アナウンス","音楽に重ねる予約再生","電話保留音"],"transcriptSha256":"80dbec253357182e2f9efc42606b95c5925439c349d5d1059cd3ddf41a23ff1f","audioSha256":"4f171d5d39f3ed4dbdb346ae93b73e07c2aa84c711403fe69b0007a2316c60e9","durationSeconds":42.72,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.52,"truePeakDbtp":-3.38,"loudnessRangeLu":2,"thresholdLufs":-29.07,"targetOffsetLu":0.16,"cached":false},{"id":"radio-your-station","label":"AI Radio","text":"アナウンスは、特定のメッセージを流したいときに役立ちます。Radioはそこから一歩進んで、ホストが進行する継続的な番組を事業のために作ります。画面の流れをご覧ください。音楽が流れ、ホストが短い挨拶や特典を紹介して、また音楽に戻ります。カフェなら焼きたてのパンのお知らせ、小売チェーンなら開催中のキャンペーンやブランドの物語、といった使い方です。ホストの声、個性、言語を選び、話す頻度も決められます。音楽は各拠点の既存のプレイリストを使うことも、放送用に選曲することも、AIに一週間の計画を頼むこともできます。放送を始める前に、一時間分のサンプルを聴くこともできます。","index":9,"src":"audio/20261102-radio-6bdfec276bba6155/radio-your-station.mp3","transcriptSha256":"f644ed57ba04d9c8de497d5867f0f881c0b459d08fe3df1e1e42e22be2cc3fb0","audioSha256":"3007864c62e7971cce8c803d8320d46c673d763f8d6870c1b5cc0e5e1c92af06","durationSeconds":50.4,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.45,"truePeakDbtp":-3.39},{"id":"radio-across-locations","label":"複数拠点のためのRadio","text":"複数の拠点がある場合は、本部で放送の方針を決め、地域別バージョンで現地に合った内容に調整します。この枝分かれの図は、同じブランドでも地域ごとにホストの言語や特典を変えられることを示しています。天気情報は、そのバージョンを受け取る店舗に適している場合に含めます。価格や日付など、プロモーションの事実はお客様のチームが指定します。Radioはそれらを保ちながら表現を変え、各パートの放送前に台本と録音音声を確認します。番組は事前に準備され、その場で即興で話すものではありません。本部では次のパートを試聴し、放送を一時停止したり、パートをスキップしたり、特定の情報源を今後使わないようにできます。放送済みの履歴も確認できます。Radioは有料のBeat BreezeプランでAIクレジットを使うため、ほかのAIツールと合わせて利用量を計画できます。","index":10,"src":"audio/20261102-radio-14f0f6961c8527a6/radio-across-locations.mp3","transcriptSha256":"40370939a8026b3d86069869c7bd14d74ba04c5db06dacf8f305921375db869c","audioSha256":"6b0047ac5f80535100536f3efc085c47ac3169e6ae2547e52c0f433b00f48b56","durationSeconds":61.44,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.53,"truePeakDbtp":-3.37},{"index":11,"id":"09-works-with-claude-and-chatgpt","label":"ClaudeとChatGPTとの連携","src":"../beat-breeze-ja/audio/20260903-e4ca5859bf68/09-works-with-claude-and-chatgpt.mp3","text":"チームがすでにClaudeやChatGPTを使っているなら、そのいつものチャット画面からBeat Breezeを利用できます。例のように、金曜日の夜に何が流れるかを尋ねたり、ロビーの音量を少し下げたり、明日のスパ用に新しい音楽スケジュールを準備したりできます。すぐに実行する操作にもユーザー権限が適用され、スケジュールの変更は保存する前に内容を見せて確認を求めます。接続にはいつでも無効にできる安全なキーを使うため、担当者や連携サービスにアクセスが不要になれば簡単に解除できます。チームは自然な言葉で日々の音楽業務を進めながら、最終的な管理権限を保てます。","visualCoverage":["自然な言葉での操作","現在のスケジュールを質問","スケジュール変更前の確認","安全で取り消し可能なアクセス"],"transcriptSha256":"86ed4f8abb58cbb8849008bca428d4e5221c7e1c4c706c0fdc46c365fa48078d","audioSha256":"88863559303206cc4a42af0d459e711633b26ef2c42251dcf0f7f8d714314b7d","durationSeconds":43.44,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.51,"truePeakDbtp":-3.4,"loudnessRangeLu":2.5,"thresholdLufs":-28.79,"targetOffsetLu":0.22,"cached":false},{"index":12,"id":"10-built-for-operators","label":"運営チームのための設計","src":"../beat-breeze-ja/audio/20260903-e4ca5859bf68/10-built-for-operators.mp3","text":"このスライドは、二つの運用モデルを上下に示しています。上側は自社で運用する方法です。ひとつのアカウントで複数の拠点とゾーンを管理し、各メンバーには必要な権限だけを付与し、ブランド基準を守るゾーンはBrand Lockで固定します。プレーヤーは、すでにお持ちのモバイル端末、Windowsパソコン、対応ブラウザで動きます。適切なマルチチャンネルのサウンドカードがあれば、一台のWindowsパソコンから複数ゾーンを運用することもできます。下側はBMAsiaが管理するモデルです。同じプラットフォームに、個別の音楽設計、24時間の技術サポート、アカウント管理、システム監視を加えます。組織の運営方法に合う支援レベルを選べます。","visualCoverage":["複数拠点のセルフサービス運用","メンバー権限とBrand Lock","プレーヤーの選択肢とWindowsの複数ゾーン","BMAsiaによる運用サービス"],"transcriptSha256":"e20f688912976fe008670ff5c22ae792645b534bca3405b4ea98bb16249268f2","audioSha256":"5485b38b8421dd15a49c44a8f0df3a01a700e1c85cd55198fec31bd5d4a6234c","durationSeconds":52.68,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.45,"truePeakDbtp":-3.52,"loudnessRangeLu":3.1,"thresholdLufs":-28.91,"targetOffsetLu":0.31,"cached":false},{"index":13,"id":"11-never-go-silent","label":"音楽を止めない仕組み","src":"../beat-breeze-ja/audio/20260903-e4ca5859bf68/11-never-go-silent.mp3","text":"どれほど創造的な機能でも、営業中の施設で安定して動かなければ価値はありません。画面の四つの保護機能は、そのためにあります。週間スケジュール、オートメーション、礼拝時刻の一時停止は現地に保存されるため、通信が切れても続き、再生履歴は接続が戻ると同期します。監視機能は各プレーヤーを見守り、停止した端末を自動で再起動します。すべてのアナウンスは、どのプレーヤーで再生できたかを報告するので、必要な空間に届いたことを確認できます。ライセンス証明書もQRコードでその場ですぐ確認できます。技術の目的はひとつです。施設のお客様には、問題があったことさえ感じさせないことです。","visualCoverage":["継続するオフライン運用","プレーヤーの自動復旧","アナウンス再生の確認","その場で確認できるライセンス"],"transcriptSha256":"b6916b8fcd4302d0850f59a16e95fd31c6c56bb4f7e6f4b62da73162eba88ad5","audioSha256":"e52526606a1569c330e9d123ff8682b5e59fcfd3b712be35afa4735877ff1284","durationSeconds":49.2,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.48,"truePeakDbtp":-3.41,"loudnessRangeLu":3.1,"thresholdLufs":-28.83,"targetOffsetLu":0.14,"cached":false},{"id":"12-why-beat-breeze","label":"Beat Breezeが選ばれる理由","text":"この比較表は、これまでの内容をひとつにつなぎます。ゾーンごとの音楽と自動スケジュールが基盤であり、多くのサービスはここから始まります。Beat Breezeはさらに、オフライン運用、Composeのオリジナル音楽、画像と動画の制作、多言語アナウンス、電話保留音、ブランド化したTV Channelsまでまとめます。Radioではさらに、ホストが進行する放送にブランドの物語やプロモーションを音楽とともに組み込めます。本当の違いは、表のどれか一つのチェックではありません。施設が音楽システム、制作ツール、メッセージ、スクリーンを別々の製品としてつなぎ合わせなくてよいことです。Beat Breezeは施設体験を運営しながら、その中で使うコンテンツも作れるようにします。","index":14,"src":"audio/20261102-radio-8e621690cbd31d1b/12-why-beat-breeze.mp3","transcriptSha256":"343984198fec901872847f0087085faceed188d4daedebd09572041687f9016e","audioSha256":"de1591be5b8e716c1f1d356f1acca36f2cdbf9f203e814d92e8eb315f9b76756","durationSeconds":55.88,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.46,"truePeakDbtp":-3.37},{"id":"13-pricing","label":"料金","text":"音楽を自分で管理するか、BMAsiaに任せるかをお選びいただけます。セルフサービスは、1ゾーンあたり月額15米ドルです。年間プランなら、1ゾーンあたり年額150米ドルになります。どちらのセルフサービスプランにもアプリの機能が含まれ、プレイリストと再生スケジュールはお客様が管理します。運用をお任せいただくBMAsia管理型は、1ゾーンあたり年額260米ドルで、年間プランのみの提供です。このプランには、BMAsiaによる音楽とRadioの運用管理が含まれます。音楽デザインチームが各ゾーンのプレイリストとスケジュールを選定し、季節や行事に合わせて見直します。24時間365日の技術サポートと専任アカウントマネージャーも含まれます。追加のAI生成クレジットは別途料金がかかります。どのプランでも、アプリは継続的に更新されます。違いは、日々の音楽管理を誰が担当するかです。セルフサービスは1ゾーンを14日間無料でお試しいただけます。カードの登録が必要ですが、開始時に料金は発生しません。BMAsiaがトライアルを手配する場合は、カードは不要です。大規模な企業には個別契約や地域に合った請求方法をご用意でき、専用プレーヤーボックスの購入も不要です。","index":15,"src":"audio/20261102-radio-3996ba07c94c58d0/13-pricing.mp3","transcriptSha256":"e817f09d3da16515f08ee7fe0994a521e71175492aec810028d515736735e75d","audioSha256":"d222d0cdd60f30534fe712a852c48dfc9c9c6efaf5b28bd97a2db3f06a7f2358","durationSeconds":94.12,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.51,"truePeakDbtp":-3.38},{"index":16,"id":"14-whos-behind-it","label":"Beat Breezeを支えるチーム","src":"../beat-breeze-ja/audio/20260903-e4ca5859bf68/14-whos-behind-it.mp3","text":"Beat Breezeを支えているのは、2002年からホテル、レストラン、小売、ウェルネス施設の音楽を設計してきたBMAsiaです。この経験が大切なのは、プラットフォームが技術だけで作られていないからです。現役の音楽デザイナーが、コンテンツの選び方やAIが各空間の特徴を理解する方法を一緒に設計しています。専門チームが24時間サポートし、製品ロードマップは現場の運営チームから共有される実際のニーズに基づいて進化します。Beat Breezeを選ぶことは、最新の技術と同時に、それを本当に支える経験豊かな音楽チームとサービスチームを選ぶことでもあります。","visualCoverage":["2002年からのBMAsiaの経験","現役の音楽デザイナーが導くキュレーション","24時間の専門サポートと運営者起点のロードマップ"],"transcriptSha256":"500ad1d8b3359b6bd4661f4bb042418923d552aeec0a1e7211401541b1a2bc54","audioSha256":"e2e455ff54d4c181c363c7bbf05bb572595e8937c6c42b1b91fa202f38dbb980","durationSeconds":44.4,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.51,"truePeakDbtp":-3.33,"loudnessRangeLu":1.9,"thresholdLufs":-28.9,"targetOffsetLu":0.14,"cached":false},{"id":"15-close","label":"はじめる","text":"以上が、現在のBeat Breezeです。音楽を中心に、スクリーン、コンテンツ、アナウンス、そしてRadioまでつながります。すでにご利用中なら、アカウント内のツールを試し、自分たちの放送がどのように聞こえるか確かめてみてください。Radioには有料プランとAIクレジットが必要です。これから始める場合は、beatbreeze.ioをご覧いただくか、BMAsiaのノルベルトまでご連絡ください。施設に合ったスタート地点を一緒に選びます。","index":17,"src":"audio/20261102-radio-f92e544f6b2b8c0f/15-close.mp3","transcriptSha256":"b94fa0278528586b54e8913483ee2b82bee062d44262559723b0d4fcb9bbbfe1","audioSha256":"879dcaafa62810f4064dd59e609430f682d53fb403739e34d58f87f0a9f34070","durationSeconds":35.44,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.44,"truePeakDbtp":-3.41}],"qualityAssurance":{"record":"docs/beat-breeze-radio-ja-20261102-qa.json","reviewedClipCount":6,"unchangedClipCount":11},"generation":{"mode":"six-targeted-radio-clips","updatedSlideIds":["02-one-platform-many-jobs","radio-your-station","radio-across-locations","12-why-beat-breeze","13-pricing","15-close"],"verifiedCarryForwardSlideCount":11},"preview":false,"complete":true};
  const COPY = {
    ko: {
      loading: ["내레이션 불러오는 중", "불러오는 중", "내레이션을 불러오는 중입니다"],
      pending: ["음성 준비 중", "준비 중", "내레이션 음성을 준비하고 있습니다"],
      idle: ["내레이션 시작", "시작", "내레이션 시작"],
      playing: ["내레이션 켜짐", "음성 켜짐", "내레이션 음소거"],
      muted: ["내레이션 계속", "계속", "내레이션 계속 재생"],
      replay: ["다시 재생", "다시", "내레이션 프레젠테이션 다시 재생"],
      error: ["오디오 다시 시도", "다시 시도", "내레이션 오디오 다시 시도"],
      unavailable: ["음성 없음", "없음", "이 슬라이드에는 내레이션이 없습니다"],
      preparing: "내레이션 음성을 준비하고 있습니다.",
      unavailableSentence: "이 슬라이드에는 내레이션이 없습니다.",
      playingSentence: (slide) => `${slide}번 슬라이드 내레이션을 재생합니다.`,
      failed: "내레이션을 재생할 수 없습니다. 다시 시도해 주세요.",
      off: "내레이션을 껐습니다.",
      complete: "내레이션 프레젠테이션이 끝났습니다.",
      audioFailed: "내레이션 오디오를 불러올 수 없습니다.",
      toolbar: "프레젠테이션 제어",
      narration: "내레이션",
      voice: "음성",
      invitationLabel: "내레이션 시작 안내",
      invitation: "설명과 함께 보시겠어요?",
      invitationStart: "내레이션 시작",
      invitationDismiss: "내레이션 안내 닫기",
      ready: "내레이션을 재생할 수 있습니다.",
      manifestFailed: "Beat Breeze 내레이션 파일을 불러오지 못했습니다",
      retry: "내레이션을 불러올 수 없습니다. 다시 시도해 주세요.",
    },
    ja: {
      loading: ["ナレーション読込中", "読込中", "ナレーションを読み込んでいます"],
      pending: ["音声準備中", "準備中", "ナレーション音声を準備しています"],
      idle: ["ナレーション開始", "開始", "ナレーションを開始"],
      playing: ["ナレーション再生中", "音声オン", "ナレーションをミュート"],
      muted: ["ナレーション再開", "再開", "ナレーションを再開"],
      replay: ["もう一度再生", "再生", "ナレーション付きプレゼンテーションをもう一度再生"],
      error: ["音声を再試行", "再試行", "ナレーション音声を再試行"],
      unavailable: ["音声なし", "利用不可", "このスライドにはナレーションがありません"],
      preparing: "ナレーション音声を準備しています。",
      unavailableSentence: "このスライドにはナレーションがありません。",
      playingSentence: (slide) => `${slide}枚目のナレーションを再生しています。`,
      failed: "ナレーションを再生できませんでした。もう一度お試しください。",
      off: "ナレーションを停止しました。",
      complete: "ナレーション付きプレゼンテーションが終了しました。",
      audioFailed: "ナレーション音声を読み込めませんでした。",
      toolbar: "プレゼンテーション操作",
      narration: "ナレーション",
      voice: "音声",
      invitationLabel: "ナレーション開始の案内",
      invitation: "解説付きでご覧になりますか？",
      invitationStart: "ナレーション開始",
      invitationDismiss: "ナレーションの案内を閉じる",
      ready: "ナレーションを再生できます。",
      manifestFailed: "Beat Breezeのナレーションファイルを読み込めませんでした",
      retry: "ナレーションを読み込めません。もう一度お試しください。",
    },
    ar: {
      loading: ["جارٍ تحميل السرد", "جارٍ التحميل", "جارٍ تحميل السرد الصوتي"],
      pending: ["الصوت قيد الإعداد", "قيد الإعداد", "جارٍ إعداد السرد الصوتي"],
      idle: ["ابدأ السرد", "ابدأ", "بدء السرد الصوتي"],
      playing: ["السرد يعمل", "الصوت يعمل", "كتم السرد الصوتي"],
      muted: ["استئناف السرد", "استئناف", "استئناف السرد الصوتي"],
      replay: ["إعادة التشغيل", "إعادة", "إعادة العرض التقديمي مع السرد"],
      error: ["إعادة محاولة الصوت", "إعادة المحاولة", "إعادة محاولة تحميل السرد"],
      unavailable: ["الصوت غير متاح", "غير متاح", "لا يتوفر سرد لهذه الشريحة"],
      preparing: "جارٍ إعداد السرد الصوتي.",
      unavailableSentence: "لا يتوفر سرد لهذه الشريحة.",
      playingSentence: (slide) => `يعمل الآن سرد الشريحة ${slide}.`,
      failed: "تعذر تشغيل السرد. يرجى المحاولة مرة أخرى.",
      off: "تم إيقاف السرد.",
      complete: "اكتمل العرض التقديمي المصحوب بالسرد.",
      audioFailed: "تعذر تحميل ملف السرد الصوتي.",
      toolbar: "عناصر التحكم في العرض",
      narration: "السرد",
      voice: "الصوت",
      invitationLabel: "دعوة لبدء السرد",
      invitation: "هل تفضلون النسخة المصحوبة بالشرح؟",
      invitationStart: "ابدأ السرد",
      invitationDismiss: "إغلاق دعوة السرد",
      ready: "السرد جاهز للتشغيل.",
      manifestFailed: "تعذر تحميل ملفات سرد Beat Breeze",
      retry: "تعذر تحميل السرد. حاولوا مرة أخرى.",
    },
  }[LOCALE];

  const ICONS = {
    idle: `
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path d="M3.5 8h3l3.6-3v10l-3.6-3h-3z" fill="currentColor"></path>
        <path d="M13 7.1a4 4 0 0 1 0 5.8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"></path>
        <path d="m14.3 4.5 3.2 2-3.2 2z" fill="#EFA634"></path>
      </svg>`,
    playing: `
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path d="M3 8h3l3.8-3.1v10.2L6 12H3z" fill="currentColor"></path>
        <path d="M12.7 7.2a4 4 0 0 1 0 5.6M15 5a7 7 0 0 1 0 10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
      </svg>`,
    muted: `
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path d="M3 8h3l3.8-3.1v10.2L6 12H3z" fill="currentColor"></path>
        <path d="m13.1 7.2 4.1 4.1m0-4.1-4.1 4.1" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"></path>
      </svg>`,
    loading: `
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <circle cx="10" cy="10" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="25 13"></circle>
      </svg>`,
    replay: `
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path d="M5.1 6.7A6 6 0 1 1 4 11.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"></path>
        <path d="M2.7 4.6v4h4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>`,
  };

  const audio = new Audio();
  audio.preload = "metadata";
  audio.setAttribute("playsinline", "");

  let stage;
  let toolbar;
  let button;
  let icon;
  let label;
  let shortLabel;
  let liveRegion;
  let invitation;
  let invitationTimer;
  let manifest;
  let manifestPromise;
  let currentIndex = 0;
  let narrationEnabled = false;
  let narrationStarted = false;
  let completed = false;
  let advanceTimer;
  let pausedForVisibility = false;
  let playbackRequest = 0;

  const clearAdvanceTimer = () => {
    window.clearTimeout(advanceTimer);
    advanceTimer = undefined;
  };

  const dismissInvitation = ({ remember = true } = {}) => {
    window.clearTimeout(invitationTimer);
    invitationTimer = undefined;
    if (invitation) invitation.hidden = true;
    if (remember) {
      try {
        window.sessionStorage.setItem(INVITATION_SESSION_KEY, "1");
      } catch {
        // The invitation still works when browser storage is unavailable.
      }
    }
  };

  const showInvitation = () => {
    if (!invitation) return;
    try {
      if (window.sessionStorage.getItem(INVITATION_SESSION_KEY) === "1") return;
    } catch {
      // Show once for this page load when browser storage is unavailable.
    }
    invitation.hidden = false;
    toolbar.classList.add("narration-discovery");
    invitationTimer = window.setTimeout(
      () => dismissInvitation(),
      INVITATION_MS,
    );
  };

  const activeSlideIndex = () => {
    const slides = [...stage.querySelectorAll(":scope > section")];
    const index = slides.findIndex((slide) =>
      slide.hasAttribute("data-deck-active"),
    );
    return Math.max(0, index);
  };

  const announce = (message) => {
    if (liveRegion) liveRegion.textContent = message;
  };

  const setProgress = (value) => {
    if (!button) return;
    const clamped = Math.min(1, Math.max(0, Number(value) || 0));
    button.style.setProperty(
      "--narration-progress",
      `${(clamped * 100).toFixed(2)}%`,
    );
  };

  const setButtonState = (stateName) => {
    if (!button) return;

    const states = {
      loading: {
        icon: ICONS.loading,
        visible: COPY.loading[0],
        short: COPY.loading[1],
        pressed: "false",
        label: COPY.loading[2],
        disabled: true,
      },
      unavailable: {
        icon: ICONS.muted,
        visible: COPY.pending[0],
        short: COPY.pending[1],
        pressed: "false",
        label: COPY.pending[2],
        disabled: true,
      },
      idle: {
        icon: ICONS.muted,
        visible: COPY.idle[0],
        short: COPY.idle[1],
        pressed: "false",
        label: COPY.idle[2],
        disabled: false,
      },
      playing: {
        icon: ICONS.playing,
        visible: COPY.playing[0],
        short: COPY.playing[1],
        pressed: "true",
        label: COPY.playing[2],
        disabled: false,
      },
      muted: {
        icon: ICONS.muted,
        visible: COPY.muted[0],
        short: COPY.muted[1],
        pressed: "false",
        label: COPY.muted[2],
        disabled: false,
      },
      replay: {
        icon: ICONS.replay,
        visible: COPY.replay[0],
        short: COPY.replay[1],
        pressed: "false",
        label: COPY.replay[2],
        disabled: false,
      },
      error: {
        icon: ICONS.muted,
        visible: COPY.error[0],
        short: COPY.error[1],
        pressed: "false",
        label: COPY.error[2],
        disabled: false,
      },
    };

    const state = states[stateName];
    button.dataset.state = stateName;
    button.disabled = state.disabled;
    button.setAttribute("aria-pressed", state.pressed);
    button.setAttribute("aria-label", state.label);
    button.setAttribute(
      "aria-busy",
      stateName === "loading" ? "true" : "false",
    );
    button.title = state.label;
    icon.innerHTML = state.icon;
    label.textContent = state.visible;
    shortLabel.textContent = state.short;
  };

  const loadManifest = async () => {
    if (manifest) return manifest;
    if (window.location.protocol === "file:") {
      manifest = LOCAL_FALLBACK_MANIFEST;
      return manifest;
    }
    if (!manifestPromise) {
      manifestPromise = fetch(MANIFEST_URL, { cache: "no-store" })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Narration manifest returned ${response.status}`);
          }
          return response.json();
        })
        .then((value) => {
          if (!value || value.deck !== "beat-breeze") {
            throw new Error("Narration manifest does not match this deck");
          }
          manifest = value;
          return value;
        })
        .catch((error) => {
          manifestPromise = undefined;
          throw error;
        });
    }
    return manifestPromise;
  };

  const slideAudio = (index) =>
    manifest?.slides?.find((slide) => slide.index === index + 1);

  const isFinalNarratedSlide = (index) => {
    const indexes = manifest?.slides
      ?.map((slide) => Number(slide.index) - 1)
      .filter(Number.isInteger);
    return indexes?.length ? index === Math.max(...indexes) : true;
  };

  const setNarrationUnavailable = () => {
    setButtonState("unavailable");
    label.textContent = COPY.unavailable[0];
    shortLabel.textContent = COPY.unavailable[1];
    button.setAttribute(
      "aria-label",
      COPY.unavailable[2],
    );
    button.title = COPY.unavailable[2];
  };

  const failPlayback = (message) => {
    clearAdvanceTimer();
    playbackRequest += 1;
    narrationEnabled = false;
    audio.pause();
    setButtonState("error");
    announce(message);
  };

  const playCurrentSlide = async ({ restart = false } = {}) => {
    clearAdvanceTimer();
    const request = ++playbackRequest;
    const requestedIndex = currentIndex;

    try {
      const data = await loadManifest();
      if (request !== playbackRequest || requestedIndex !== currentIndex) return;
      if (!data.ready || !Array.isArray(data.slides) || !data.slides.length) {
        narrationEnabled = false;
        setButtonState("unavailable");
        announce(COPY.preparing);
        return;
      }

      const slide = slideAudio(requestedIndex);
      if (!slide?.src) {
        narrationEnabled = false;
        setNarrationUnavailable();
        announce(COPY.unavailableSentence);
        return;
      }

      const nextSource = new URL(slide.src, MANIFEST_URL).href;
      const sourceChanged = audio.src !== nextSource;
      if (sourceChanged) {
        audio.src = nextSource;
        audio.load();
      } else if (restart) {
        audio.currentTime = 0;
      }

      narrationEnabled = true;
      narrationStarted = true;
      completed = false;
      setButtonState("playing");
      announce(COPY.playingSentence(currentIndex + 1));
      await audio.play();
    } catch (error) {
      if (request !== playbackRequest || error?.name === "AbortError") return;
      console.error("Beat Breeze narration playback failed", error);
      failPlayback(COPY.failed);
    }
  };

  const turnNarrationOff = () => {
    clearAdvanceTimer();
    playbackRequest += 1;
    narrationEnabled = false;
    audio.pause();
    setButtonState("muted");
    announce(COPY.off);
  };

  const handleToggle = async () => {
    dismissInvitation();
    toolbar.classList.remove("narration-discovery");

    if (completed) {
      narrationEnabled = true;
      completed = false;
      setButtonState("playing");
      if (currentIndex === 0) {
        await playCurrentSlide({ restart: true });
      } else {
        stage.goTo(0);
      }
      return;
    }

    if (narrationEnabled) {
      turnNarrationOff();
      return;
    }

    await playCurrentSlide({ restart: true });
  };

  const handleSlideChange = (event) => {
    clearAdvanceTimer();
    currentIndex = Number.isInteger(event.detail?.index)
      ? event.detail.index
      : activeSlideIndex();
    completed = false;
    setProgress(0);

    const hasNarration = Boolean(slideAudio(currentIndex)?.src);

    if (narrationEnabled && hasNarration) {
      void playCurrentSlide({ restart: true });
    } else {
      if (narrationEnabled) {
        playbackRequest += 1;
        narrationEnabled = false;
      }
      audio.pause();
      audio.removeAttribute("src");
      audio.load();

      if (!hasNarration) {
        setNarrationUnavailable();
        announce(COPY.unavailableSentence);
      } else {
        setButtonState(narrationStarted ? "muted" : "idle");
      }
    }
  };

  const addStyles = (root) => {
    if (root.querySelector("#beat-breeze-narration-styles")) return;
    const style = document.createElement("style");
    style.id = "beat-breeze-narration-styles";
    style.textContent = `
      .overlay.narration-discovery {
        opacity: 1;
        pointer-events: auto;
        transform: translate(-50%, 0) scale(1);
        filter: blur(0);
      }

      .overlay:focus-within {
        opacity: 1;
        pointer-events: auto;
        transform: translate(-50%, 0) scale(1);
        filter: blur(0);
      }

      .narration-toggle {
        --narration-progress: 0%;
        position: relative;
        width: 140px;
        min-width: 140px;
        padding: 0 10px !important;
        gap: 7px;
        overflow: hidden;
        cursor: pointer !important;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.02em;
        color: rgba(255,255,255,0.82) !important;
      }

      .narration-toggle::after {
        content: "";
        position: absolute;
        left: 10px;
        right: 10px;
        bottom: 2px;
        height: 1px;
        border-radius: 999px;
        background: linear-gradient(
          90deg,
          #EFA634 0 var(--narration-progress),
          rgba(255,255,255,0.12) var(--narration-progress) 100%
        );
        opacity: 0;
        transition: opacity 160ms ease;
      }

      .narration-toggle[data-state="idle"] {
        background: rgba(239,166,52,0.16);
        color: #fff !important;
      }

      .narration-toggle[data-state="playing"] {
        background: rgba(239,166,52,0.2);
        color: #EFA634 !important;
        box-shadow: inset 0 0 0 1px rgba(239,166,52,0.28);
      }

      .narration-toggle[data-state="playing"]::after {
        opacity: 1;
      }

      .narration-toggle[data-state="loading"] .narration-icon svg {
        animation: narration-spin 900ms linear infinite;
      }

      .narration-toggle[data-state="unavailable"] {
        cursor: default !important;
        opacity: 0.56;
      }

      .narration-toggle[data-state="error"] {
        background: rgba(255,255,255,0.1);
      }

      .narration-toggle:focus-visible {
        outline: 2px solid #EFA634 !important;
        outline-offset: 2px !important;
      }

      .narration-icon {
        position: relative;
        width: 18px;
        min-width: 18px;
        height: 18px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .narration-icon svg {
        width: 18px !important;
        height: 18px !important;
      }

      .narration-toggle[data-state="playing"] .narration-icon::after {
        content: "";
        position: absolute;
        top: -1px;
        right: -1px;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: #EFA634;
        box-shadow: 0 0 0 3px rgba(239,166,52,0.12);
      }

      .narration-label {
        white-space: nowrap;
      }

      .narration-label-short { display: none; }

      .narration-invitation[hidden] { display: none !important; }

      .narration-invitation {
        position: fixed;
        left: 50%;
        bottom: 84px;
        z-index: 120;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        gap: 12px;
        max-width: min(430px, calc(100vw - 28px));
        padding: 12px 14px 12px 18px;
        border: 1px solid rgba(255,255,255,0.14);
        border-radius: 14px;
        background: rgba(20,20,20,0.96);
        box-shadow: 0 18px 44px rgba(0,0,0,0.38);
        color: rgba(255,255,255,0.82);
        font: 500 13px/1.35 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        animation: narration-invitation-in 240ms ease-out both;
      }

      .narration-invitation::after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: -6px;
        width: 10px;
        height: 10px;
        transform: translateX(-50%) rotate(45deg);
        border-right: 1px solid rgba(255,255,255,0.14);
        border-bottom: 1px solid rgba(255,255,255,0.14);
        background: rgba(20,20,20,0.96);
      }

      .narration-invitation-copy { white-space: nowrap; }

      .narration-invitation-start {
        appearance: none;
        border: 0;
        border-radius: 999px;
        padding: 8px 12px;
        background: #EFA634;
        color: #111;
        cursor: pointer;
        font: 700 12px/1 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        white-space: nowrap;
      }

      .narration-invitation-start:focus-visible,
      .narration-invitation-dismiss:focus-visible {
        outline: 2px solid #EFA634;
        outline-offset: 2px;
      }

      .narration-invitation-dismiss {
        appearance: none;
        width: 28px;
        min-width: 28px;
        height: 28px;
        border: 0;
        border-radius: 50%;
        background: transparent;
        color: rgba(255,255,255,0.58);
        cursor: pointer;
        font: 400 18px/1 sans-serif;
      }

      .narration-sr-only {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        padding: 0 !important;
        margin: -1px !important;
        overflow: hidden !important;
        clip: rect(0, 0, 0, 0) !important;
        white-space: nowrap !important;
        border: 0 !important;
      }

      @keyframes narration-spin {
        to { transform: rotate(360deg); }
      }

      @keyframes narration-invitation-in {
        from { opacity: 0; transform: translate(-50%, 8px); }
        to { opacity: 1; transform: translate(-50%, 0); }
      }

      @media (max-width: 520px) {
        .btn.reset,
        .reset-divider { display: none !important; }
        .narration-invitation {
          width: calc(100vw - 28px);
          bottom: 88px;
          gap: 8px;
          padding-left: 14px;
          box-sizing: border-box;
        }
        .narration-invitation-copy { white-space: nowrap; }
      }

      @media (max-width: 360px) {
        .narration-toggle {
          width: 96px;
          min-width: 96px;
        }
        .narration-label { display: none; }
        .narration-label-short { display: inline; white-space: nowrap; }
        .narration-invitation {
          gap: 6px;
          padding: 10px 12px;
        }
        .narration-invitation-copy { font-size: 12px; }
        .narration-invitation-start { padding: 7px 10px; }
      }

      @media (pointer: coarse) {
        .overlay {
          bottom: max(22px, env(safe-area-inset-bottom));
        }
        .narration-toggle {
          height: 44px;
          width: 140px;
          min-width: 140px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .narration-toggle[data-state="loading"] .narration-icon svg {
          animation: none;
        }
        .narration-invitation { animation: none; }
      }
    `;
    root.append(style);
  };

  const install = () => {
    stage = document.querySelector("deck-stage");
    const root = stage?.shadowRoot;
    toolbar = root?.querySelector('[role="toolbar"]');
    if (!stage || !root || !toolbar) return false;
    if (root.querySelector("#beat-breeze-narration-toggle")) return true;

    addStyles(root);
    toolbar.setAttribute("aria-label", COPY.toolbar);

    const divider = document.createElement("span");
    divider.className = "divider narration-divider";
    divider.setAttribute("aria-hidden", "true");

    button = document.createElement("button");
    button.id = "beat-breeze-narration-toggle";
    button.className = "btn narration-toggle";
    button.type = "button";
    button.setAttribute("aria-keyshortcuts", "M");
    button.innerHTML = `
      <span class="narration-icon" aria-hidden="true"></span>
      <span class="narration-label">${COPY.narration}</span>
      <span class="narration-label-short">${COPY.voice}</span>
    `;
    icon = button.querySelector(".narration-icon");
    label = button.querySelector(".narration-label");
    shortLabel = button.querySelector(".narration-label-short");

    const resetButton = toolbar.querySelector(".btn.reset");
    if (resetButton?.previousElementSibling?.classList.contains("divider")) {
      resetButton.previousElementSibling.classList.add("reset-divider");
    }

    liveRegion = document.createElement("span");
    liveRegion.className = "narration-sr-only";
    liveRegion.setAttribute("role", "status");
    liveRegion.setAttribute("aria-live", "polite");

    toolbar.append(divider, button, liveRegion);

    invitation = document.createElement("div");
    invitation.className = "narration-invitation";
    invitation.hidden = true;
    invitation.setAttribute("role", "group");
    invitation.setAttribute("aria-label", COPY.invitationLabel);
    invitation.innerHTML = `
      <span class="narration-invitation-copy">${COPY.invitation}</span>
      <button class="narration-invitation-start" type="button">${COPY.invitationStart}</button>
      <button class="narration-invitation-dismiss" type="button" aria-label="${COPY.invitationDismiss}">×</button>
    `;
    root.append(invitation);
    setButtonState("loading");
    currentIndex = activeSlideIndex();

    button.addEventListener("click", () => void handleToggle());
    invitation
      .querySelector(".narration-invitation-start")
      ?.addEventListener("click", () => void handleToggle());
    invitation
      .querySelector(".narration-invitation-dismiss")
      ?.addEventListener("click", () => dismissInvitation());
    stage.addEventListener("slidechange", handleSlideChange);
    document.addEventListener("keydown", (event) => {
      const target = event.target;
      const isTyping =
        target instanceof HTMLElement &&
        (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));
      if (!isTyping && event.key.toLowerCase() === "m" && !button.disabled) {
        event.preventDefault();
        void handleToggle();
      } else if (!isTyping && event.key === "Escape" && !invitation.hidden) {
        event.preventDefault();
        dismissInvitation();
      }
    });

    audio.addEventListener("timeupdate", () => {
      setProgress(audio.duration ? audio.currentTime / audio.duration : 0);
    });
    audio.addEventListener("ended", () => {
      setProgress(1);
      if (!narrationEnabled) return;
      const nextSlideHasNarration = Boolean(slideAudio(currentIndex + 1)?.src);
      if (!isFinalNarratedSlide(currentIndex) && nextSlideHasNarration) {
        advanceTimer = window.setTimeout(() => stage.next(), ADVANCE_DELAY_MS);
      } else {
        narrationEnabled = false;
        completed = true;
        setButtonState("replay");
        announce(COPY.complete);
      }
    });
    audio.addEventListener("error", () => {
      if (audio.getAttribute("src")) {
        failPlayback(COPY.audioFailed);
      }
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden && narrationEnabled && !audio.paused) {
        pausedForVisibility = true;
        audio.pause();
      } else if (!document.hidden && pausedForVisibility && narrationEnabled) {
        pausedForVisibility = false;
        void audio.play().catch(() => turnNarrationOff());
      }
    });

    void loadManifest()
      .then((data) => {
        if (!data.ready || !Array.isArray(data.slides) || !data.slides.length) {
          setButtonState("unavailable");
          return;
        }
        if (slideAudio(currentIndex)?.src) {
          setButtonState("idle");
          announce(COPY.ready);
        } else {
          setNarrationUnavailable();
          announce(COPY.unavailableSentence);
        }
        toolbar.classList.add("narration-discovery");
        showInvitation();
        window.setTimeout(
          () => toolbar.classList.remove("narration-discovery"),
          DISCOVERY_MS,
        );
      })
      .catch((error) => {
        console.error(COPY.manifestFailed, error);
        setButtonState("error");
        announce(COPY.retry);
      });

    return true;
  };

  if (install()) return;

  const observer = new MutationObserver(() => {
    if (install()) {
      observer.disconnect();
      window.clearInterval(installPoll);
    }
  });
  const installPoll = window.setInterval(() => {
    if (install()) {
      window.clearInterval(installPoll);
      observer.disconnect();
    }
  }, 100);
  observer.observe(document, { childList: true, subtree: true });
  window.setTimeout(() => {
    observer.disconnect();
    window.clearInterval(installPoll);
  }, 10000);
})();
