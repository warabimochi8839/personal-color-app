// パーソナルカラータイプ別の推奨データ

const PERSONAL_COLOR_DATA = {
    spring: {
        name: 'スプリング',
        nameEn: 'Spring',
        description: '明るく華やかな印象を持つあなたは、暖かみのある鮮やかな色がお似合いです。フレッシュで若々しいイメージを大切に。',
        undertone: 'イエローベース（ウォームトーン）',
        characteristics: [
            '肌に黄みがあり、透明感がある',
            '瞳がキラキラと明るい',
            '髪にツヤがあり、明るい茶色系'
        ],
        makeup: {
            eyeshadow: [
                { name: 'コーラルピンク', color: '#F08080', description: '肌なじみ◎' },
                { name: 'サーモンオレンジ', color: '#FA8072', description: '華やかに' },
                { name: 'シャンパンゴールド', color: '#F7E7CE', description: 'キラキラ感' },
                { name: 'ライトブラウン', color: '#C4A77D', description: 'ナチュラル' },
                { name: 'アプリコット', color: '#FBCEB1', description: '優しい印象' }
            ],
            cheek: [
                { name: 'コーラルピーチ', color: '#FFAB91', description: '血色感アップ' },
                { name: 'サーモンピンク', color: '#FF9999', description: 'ヘルシー' },
                { name: 'アプリコット', color: '#FBCEB1', description: 'ナチュラル' },
                { name: 'オレンジコーラル', color: '#FF7F50', description: '元気な印象' }
            ],
            foundation: [
                { name: 'ベージュオークル', color: '#F5DEB3', description: '標準肌向け' },
                { name: 'ライトベージュ', color: '#FFE4C4', description: '明るい肌向け' },
                { name: 'イエローベージュ', color: '#FAEBD7', description: '黄みが強い肌向け' }
            ],
            eyeliner: [
                { name: 'ブラウン', color: '#8B4513', description: '柔らかい印象' },
                { name: 'テラコッタ', color: '#CC6633', description: 'おしゃれ感' },
                { name: 'ダークオレンジ', color: '#CC5500', description: '個性的に' }
            ],
            lip: [
                { name: 'コーラルレッド', color: '#FF6B6B', description: '華やかに' },
                { name: 'サーモンピンク', color: '#FF9999', description: '可愛らしく' },
                { name: 'オレンジベージュ', color: '#E0A080', description: 'デイリーに' }
            ]
        },
        fashion: {
            best: [
                { name: 'コーラル', color: '#FF7F50' },
                { name: 'サーモンピンク', color: '#FA8072' },
                { name: 'アイボリー', color: '#FFFFF0' },
                { name: 'キャメル', color: '#C19A6B' },
                { name: 'ターコイズ', color: '#40E0D0' },
                { name: 'イエローグリーン', color: '#9ACD32' },
                { name: 'オレンジ', color: '#FFA500' },
                { name: 'ゴールド', color: '#FFD700' }
            ],
            avoid: [
                { name: 'ブラック', color: '#000000' },
                { name: 'ダークグレー', color: '#404040' },
                { name: 'ボルドー', color: '#800020' },
                { name: 'ダークパープル', color: '#301934' }
            ]
        },
        hairstyle: {
            description: '軽やかで動きのあるスタイルが◎。明るく柔らかい印象を活かして。',
            short: [
                { name: 'エアリーショート', description: '軽やかなレイヤーで動きを出したスタイル' },
                { name: 'マッシュショート', description: '丸みのある可愛らしいシルエット' },
                { name: 'ショートボブ', description: 'すっきり清潔感のあるスタイル' }
            ],
            medium: [
                { name: 'レイヤーミディ', description: '軽やかな動きで華やかに' },
                { name: '外ハネボブ', description: '元気で明るい印象に' },
                { name: 'ゆるふわミディ', description: '柔らかいウェーブで優しく' }
            ],
            long: [
                { name: 'ゆるウェーブロング', description: '柔らかい巻き髪で女性らしく' },
                { name: 'レイヤーロング', description: '軽やかで動きのあるスタイル' },
                { name: 'ナチュラルストレート', description: 'ツヤを活かしたシンプルスタイル' }
            ]
        },
        hairColor: {
            description: '明るく暖かみのあるカラーがベスト。ツヤ感を大切に。',
            recommended: [
                { name: 'ハニーブラウン', color: '#C4A35A', description: '透明感アップ' },
                { name: 'オレンジベージュ', color: '#D4A76A', description: '華やかに' },
                { name: 'キャラメルブラウン', color: '#B5724D', description: 'こなれ感' },
                { name: 'ミルクティーベージュ', color: '#C9B99A', description: '柔らかい印象' },
                { name: 'アプリコットオレンジ', color: '#E08050', description: '個性的に' }
            ],
            avoid: [
                { name: 'アッシュ系', color: '#8A8A8A', description: '顔色がくすんで見える' },
                { name: 'ブルーブラック', color: '#1A1A2E', description: '重たく見える' }
            ]
        },
        accessories: {
            description: 'ゴールド系やコーラル系の暖かみのある素材が◎',
            metals: [
                { name: 'イエローゴールド', color: '#FFD700', description: '肌なじみ抜群' },
                { name: 'ピンクゴールド', color: '#E8B4B8', description: '女性らしく' },
                { name: 'シャンパンゴールド', color: '#F7E7CE', description: '上品に' }
            ],
            stones: [
                { name: 'コーラル', color: '#FF7F50', description: '血色感アップ' },
                { name: 'シトリン', color: '#E4D00A', description: '華やかに' },
                { name: 'ターコイズ', color: '#40E0D0', description: '爽やかに' },
                { name: 'ペリドット', color: '#9ACD32', description: 'フレッシュに' }
            ]
        },
        nail: {
            description: '明るく温かみのあるカラーで華やかな手元に',
            recommended: [
                { name: 'コーラルピンク', color: '#FF7F7F', description: '定番モテネイル' },
                { name: 'サーモンベージュ', color: '#E8B89D', description: 'オフィスにも◎' },
                { name: 'アプリコット', color: '#FBCEB1', description: '優しい印象' },
                { name: 'シャンパンゴールド', color: '#F7E7CE', description: 'パーティーに' },
                { name: 'オレンジ', color: '#FFA07A', description: '元気な印象' },
                { name: 'ミントグリーン', color: '#98FF98', description: '夏にぴったり' }
            ]
        }
    },
    summer: {
        name: 'サマー',
        nameEn: 'Summer',
        description: '上品で柔らかな印象のあなたは、くすみのあるエレガントな色がお似合いです。涼しげで穏やかなイメージを大切に。',
        undertone: 'ブルーベース（クールトーン）',
        characteristics: [
            '肌にピンクみがあり、繊細',
            '瞳がソフトでグレーがかっている',
            '髪がアッシュ系やソフトブラック'
        ],
        makeup: {
            eyeshadow: [
                { name: 'ラベンダー', color: '#E6E6FA', description: '透明感アップ' },
                { name: 'ローズピンク', color: '#FF66B2', description: 'エレガント' },
                { name: 'シルバーグレー', color: '#C0C0C0', description: 'モード感' },
                { name: 'ココアブラウン', color: '#9E8B7D', description: 'ナチュラル' },
                { name: 'スモーキーブルー', color: '#778899', description: 'クール' }
            ],
            cheek: [
                { name: 'ローズピンク', color: '#E8B4C8', description: '上品に' },
                { name: 'ラベンダーピンク', color: '#DDA0DD', description: '透明感' },
                { name: 'モーブピンク', color: '#C08081', description: 'エレガント' },
                { name: 'ベビーピンク', color: '#F4C2C2', description: '可愛らしく' }
            ],
            foundation: [
                { name: 'ピンクオークル', color: '#F5DEB3', description: '標準肌向け' },
                { name: 'ピンクベージュ', color: '#E8C4B8', description: 'ピンク肌向け' },
                { name: 'ライトピンク', color: '#FFE4E1', description: '明るい肌向け' }
            ],
            eyeliner: [
                { name: 'ダークブラウン', color: '#5C4033', description: '柔らかく' },
                { name: 'チャコールグレー', color: '#36454F', description: 'モード感' },
                { name: 'バーガンディ', color: '#722F37', description: 'おしゃれ' }
            ],
            lip: [
                { name: 'ローズレッド', color: '#C21E56', description: 'エレガント' },
                { name: 'ベリーピンク', color: '#B43757', description: '大人可愛い' },
                { name: 'モーブピンク', color: '#C08081', description: 'デイリーに' }
            ]
        },
        fashion: {
            best: [
                { name: 'ラベンダー', color: '#E6E6FA' },
                { name: 'ローズピンク', color: '#FF66B2' },
                { name: 'スカイブルー', color: '#87CEEB' },
                { name: 'オフホワイト', color: '#FAF0E6' },
                { name: 'ミントグリーン', color: '#98FF98' },
                { name: 'シルバー', color: '#C0C0C0' },
                { name: 'ブルーグレー', color: '#6699CC' },
                { name: 'ココア', color: '#875F42' }
            ],
            avoid: [
                { name: 'オレンジ', color: '#FFA500' },
                { name: 'キャメル', color: '#C19A6B' },
                { name: 'ゴールド', color: '#FFD700' },
                { name: 'モスグリーン', color: '#8A9A5B' }
            ]
        },
        hairstyle: {
            description: 'ソフトで上品なスタイルが◎。エレガントで落ち着いた印象を活かして。',
            short: [
                { name: 'ふんわりショート', description: '柔らかいシルエットで上品に' },
                { name: 'ハンサムショート', description: 'クールで知的な印象に' },
                { name: 'グラデーションボブ', description: '動きのある洗練スタイル' }
            ],
            medium: [
                { name: 'ワンカールミディ', description: '品のある柔らかいスタイル' },
                { name: 'くびれミディ', description: 'エレガントなシルエット' },
                { name: 'ふんわりパーマミディ', description: '柔らかウェーブで優しく' }
            ],
            long: [
                { name: 'ゆるふわウェーブ', description: 'エアリーで女性らしく' },
                { name: 'ワンレングス', description: 'シンプルで上品に' },
                { name: 'ローレイヤーロング', description: 'まとまりのある大人スタイル' }
            ]
        },
        hairColor: {
            description: 'くすみのあるソフトなカラーがベスト。アッシュ系が特に◎',
            recommended: [
                { name: 'アッシュベージュ', color: '#A89F91', description: '透明感抜群' },
                { name: 'ラベンダーアッシュ', color: '#B8A9C9', description: 'エレガントに' },
                { name: 'ピンクベージュ', color: '#D4B5B0', description: '柔らかい印象' },
                { name: 'グレージュ', color: '#9E9589', description: 'こなれ感' },
                { name: 'ココアブラウン', color: '#8B7355', description: 'ナチュラルに' }
            ],
            avoid: [
                { name: 'オレンジ系', color: '#D2691E', description: '肌がくすんで見える' },
                { name: '真っ黒', color: '#000000', description: '重たく見える' }
            ]
        },
        accessories: {
            description: 'シルバー系やパールなど涼しげな素材が◎',
            metals: [
                { name: 'シルバー', color: '#C0C0C0', description: '透明感アップ' },
                { name: 'ホワイトゴールド', color: '#E8E8E8', description: '上品に' },
                { name: 'プラチナ', color: '#E5E4E2', description: 'エレガントに' }
            ],
            stones: [
                { name: 'パール', color: '#FDEEF4', description: '上品さアップ' },
                { name: 'アメジスト', color: '#9966CC', description: 'エレガントに' },
                { name: 'ローズクォーツ', color: '#F7CAC9', description: '優しい印象' },
                { name: 'アクアマリン', color: '#7FFFD4', description: '涼しげに' }
            ]
        },
        nail: {
            description: 'くすみカラーやシアー系で上品な手元に',
            recommended: [
                { name: 'ローズピンク', color: '#E8B4C8', description: '定番エレガント' },
                { name: 'ラベンダー', color: '#E6E6FA', description: '透明感アップ' },
                { name: 'グレージュ', color: '#9E9589', description: 'こなれ感' },
                { name: 'シアーピンク', color: '#FFE4E1', description: 'オフィスに◎' },
                { name: 'モーブ', color: '#C08081', description: '大人っぽく' },
                { name: 'スモーキーブルー', color: '#778899', description: 'クールに' }
            ]
        }
    },
    autumn: {
        name: 'オータム',
        nameEn: 'Autumn',
        description: 'リッチで落ち着いた印象のあなたは、深みのある暖かみのある色がお似合いです。ゴージャスで大人っぽいイメージを大切に。',
        undertone: 'イエローベース（ウォームトーン）',
        characteristics: [
            '肌にマットな質感と黄みがある',
            '瞳が深みのあるダークブラウン',
            '髪がダークブラウンやこげ茶'
        ],
        makeup: {
            eyeshadow: [
                { name: 'テラコッタ', color: '#E2725B', description: 'おしゃれ感' },
                { name: 'カーキ', color: '#8F9779', description: 'こなれ感' },
                { name: 'ブロンズ', color: '#CD7F32', description: 'ゴージャス' },
                { name: 'ダークブラウン', color: '#5C4033', description: '深みを出す' },
                { name: 'オリーブ', color: '#808000', description: '個性的に' }
            ],
            cheek: [
                { name: 'テラコッタ', color: '#CC6633', description: '大人っぽく' },
                { name: 'オレンジブラウン', color: '#B5651D', description: 'こなれ感' },
                { name: 'サーモン', color: '#E9967A', description: 'ナチュラル' },
                { name: 'コーラルブラウン', color: '#CD5C5C', description: '血色感' }
            ],
            foundation: [
                { name: 'オークル', color: '#CC9966', description: '標準肌向け' },
                { name: 'ベージュオークル', color: '#E3C896', description: 'やや明るい肌向け' },
                { name: 'ダークベージュ', color: '#C8A676', description: '暗めの肌向け' }
            ],
            eyeliner: [
                { name: 'ダークブラウン', color: '#3D2B1F', description: '深みを出す' },
                { name: 'カーキ', color: '#4B5320', description: 'こなれ感' },
                { name: 'ボルドー', color: '#722F37', description: '秋らしさ' }
            ],
            lip: [
                { name: 'ブリックレッド', color: '#CB4154', description: '大人っぽく' },
                { name: 'テラコッタ', color: '#CC6633', description: 'おしゃれ' },
                { name: 'オレンジブラウン', color: '#B5651D', description: 'デイリーに' }
            ]
        },
        fashion: {
            best: [
                { name: 'キャメル', color: '#C19A6B' },
                { name: 'テラコッタ', color: '#E2725B' },
                { name: 'カーキ', color: '#8F9779' },
                { name: 'マスタード', color: '#FFDB58' },
                { name: 'ブラウン', color: '#8B4513' },
                { name: 'オリーブ', color: '#808000' },
                { name: 'ゴールド', color: '#D4AF37' },
                { name: 'オレンジ', color: '#FF8C00' }
            ],
            avoid: [
                { name: 'ピンク', color: '#FFC0CB' },
                { name: 'パステルブルー', color: '#AEC6CF' },
                { name: 'シルバー', color: '#C0C0C0' },
                { name: 'ブラック', color: '#000000' }
            ]
        },
        hairstyle: {
            description: 'リッチで落ち着いたスタイルが◎。大人っぽくゴージャスに。',
            short: [
                { name: 'マッシュショート', description: '丸みのある落ち着いたシルエット' },
                { name: 'かきあげショート', description: 'かきあげ前髪で大人っぽく' },
                { name: 'ハンサムショート', description: 'クールで知的な印象' }
            ],
            medium: [
                { name: 'ウルフミディ', description: 'こなれ感たっぷり' },
                { name: '外ハネミディ', description: 'カジュアルで動きのあるスタイル' },
                { name: 'レイヤーミディ', description: '軽やかで華やかに' }
            ],
            long: [
                { name: 'ウェットウェーブ', description: 'ツヤ感で大人っぽく' },
                { name: 'かきあげロング', description: 'ゴージャスな印象' },
                { name: 'ハイレイヤーロング', description: '動きのあるスタイル' }
            ]
        },
        hairColor: {
            description: '深みのある暖かみのあるカラーがベスト。マット系も◎',
            recommended: [
                { name: 'ダークブラウン', color: '#5C4033', description: '落ち着いた印象' },
                { name: 'カッパーブラウン', color: '#B87333', description: 'ゴージャスに' },
                { name: 'カーキベージュ', color: '#8F9779', description: 'こなれ感' },
                { name: 'オリーブブラウン', color: '#6B5344', description: '大人っぽく' },
                { name: 'マロンブラウン', color: '#8B4513', description: '深みを出す' }
            ],
            avoid: [
                { name: '明るいアッシュ', color: '#C0C0C0', description: '顔色がくすむ' },
                { name: 'プラチナ系', color: '#E5E4E2', description: '肌から浮く' }
            ]
        },
        accessories: {
            description: 'ゴールド系やアンティーク調の素材が◎',
            metals: [
                { name: 'アンティークゴールド', color: '#CFB53B', description: '深みを出す' },
                { name: 'ブロンズ', color: '#CD7F32', description: 'ゴージャスに' },
                { name: 'イエローゴールド', color: '#FFD700', description: '華やかに' }
            ],
            stones: [
                { name: 'アンバー', color: '#FFBF00', description: '温かみアップ' },
                { name: 'タイガーアイ', color: '#B5651D', description: '大人っぽく' },
                { name: 'ガーネット', color: '#722F37', description: '深みを出す' },
                { name: 'トルマリン', color: '#8B4513', description: '落ち着いた印象' }
            ]
        },
        nail: {
            description: '深みのあるリッチなカラーで大人っぽい手元に',
            recommended: [
                { name: 'テラコッタ', color: '#E2725B', description: 'おしゃれ定番' },
                { name: 'ボルドー', color: '#722F37', description: '大人っぽく' },
                { name: 'カーキ', color: '#8F9779', description: 'こなれ感' },
                { name: 'ブラウン', color: '#8B4513', description: 'シックに' },
                { name: 'ゴールド', color: '#D4AF37', description: 'ゴージャスに' },
                { name: 'マスタード', color: '#FFDB58', description: '季節感アップ' }
            ]
        }
    },
    winter: {
        name: 'ウィンター',
        nameEn: 'Winter',
        description: 'シャープでドラマティックな印象のあなたは、鮮やかでコントラストの強い色がお似合いです。クールでモダンなイメージを大切に。',
        undertone: 'ブルーベース（クールトーン）',
        characteristics: [
            '肌が白くて透き通っている',
            '瞳が濃いブラックやダークブラウン',
            '白目と黒目のコントラストが強い'
        ],
        makeup: {
            eyeshadow: [
                { name: 'シルバー', color: '#C0C0C0', description: 'クール' },
                { name: 'ロイヤルブルー', color: '#4169E1', description: '鮮やか' },
                { name: 'フューシャ', color: '#FF00FF', description: 'ドラマティック' },
                { name: 'ブラック', color: '#1A1A1A', description: 'モード感' },
                { name: 'アイシーピンク', color: '#F8B9D4', description: '可愛らしく' }
            ],
            cheek: [
                { name: 'フューシャピンク', color: '#FF77FF', description: '華やか' },
                { name: 'ローズピンク', color: '#FF66B2', description: 'エレガント' },
                { name: 'ベリーピンク', color: '#8E4585', description: '大人っぽく' },
                { name: 'ピンクベージュ', color: '#DBB2AB', description: 'ナチュラル' }
            ],
            foundation: {
                colors: [
                    { name: 'ピンクオークル', color: '#F5DEB3', description: '標準肌向け' },
                    { name: 'ナチュラルベージュ', color: '#F5E6D3', description: '明るい肌向け' },
                    { name: 'ライトピンク', color: '#FFE4E1', description: '色白肌向け' }
                ]
            },
            eyeliner: [
                { name: 'ブラック', color: '#000000', description: 'くっきり' },
                { name: 'ネイビー', color: '#000080', description: 'クール' },
                { name: 'ダークパープル', color: '#301934', description: 'ミステリアス' }
            ],
            lip: [
                { name: 'トゥルーレッド', color: '#FF0000', description: 'ドラマティック' },
                { name: 'フューシャ', color: '#FF00FF', description: '華やか' },
                { name: 'ワインレッド', color: '#722F37', description: '大人っぽく' }
            ]
        },
        fashion: {
            best: [
                { name: 'ピュアホワイト', color: '#FFFFFF' },
                { name: 'ブラック', color: '#000000' },
                { name: 'ロイヤルブルー', color: '#4169E1' },
                { name: 'フューシャ', color: '#FF00FF' },
                { name: 'レッド', color: '#FF0000' },
                { name: 'エメラルド', color: '#50C878' },
                { name: 'シルバー', color: '#C0C0C0' },
                { name: 'レモンイエロー', color: '#FFF44F' }
            ],
            avoid: [
                { name: 'オレンジ', color: '#FFA500' },
                { name: 'キャメル', color: '#C19A6B' },
                { name: 'サーモン', color: '#FA8072' },
                { name: 'アースカラー', color: '#8B7355' }
            ]
        },
        hairstyle: {
            description: 'シャープでモダンなスタイルが◎。コントラストを活かして印象的に。',
            short: [
                { name: 'ショートボブ', description: 'シャープで洗練された印象' },
                { name: 'ピクシーカット', description: 'モードでスタイリッシュ' },
                { name: 'ハンサムショート', description: 'クールでかっこよく' }
            ],
            medium: [
                { name: 'ストレートボブ', description: 'シャープでモダンに' },
                { name: '切りっぱなしミディ', description: 'エッジの効いたスタイル' },
                { name: 'ウェットミディ', description: 'モードで大人っぽく' }
            ],
            long: [
                { name: 'ストレートロング', description: 'シャープで印象的に' },
                { name: 'ワンレングス', description: 'シンプルでモダン' },
                { name: 'ハイコントラストウェーブ', description: 'ドラマティックに' }
            ]
        },
        hairColor: {
            description: 'コントラストの強いカラーがベスト。ブラックや鮮やかな色も◎',
            recommended: [
                { name: 'ブルーブラック', color: '#1A1A2E', description: 'シャープに' },
                { name: 'バイオレットブラック', color: '#2D132C', description: 'ミステリアス' },
                { name: 'プラチナ', color: '#E5E4E2', description: 'ドラマティック' },
                { name: 'ワインレッド', color: '#722F37', description: '個性的に' },
                { name: 'アッシュブラック', color: '#2F2F2F', description: 'モダンに' }
            ],
            avoid: [
                { name: 'オレンジ系', color: '#D2691E', description: '肌から浮く' },
                { name: '明るいブラウン', color: '#C4A35A', description: 'ぼやけて見える' }
            ]
        },
        accessories: {
            description: 'シルバーやプラチナなどクールな素材が◎',
            metals: [
                { name: 'シルバー', color: '#C0C0C0', description: 'クールに' },
                { name: 'プラチナ', color: '#E5E4E2', description: 'エレガントに' },
                { name: 'ホワイトゴールド', color: '#E8E8E8', description: 'モダンに' }
            ],
            stones: [
                { name: 'ダイヤモンド', color: '#B9F2FF', description: '輝きを添える' },
                { name: 'サファイア', color: '#0F52BA', description: 'ドラマティック' },
                { name: 'エメラルド', color: '#50C878', description: '鮮やかに' },
                { name: 'ルビー', color: '#E0115F', description: '華やかに' }
            ]
        },
        nail: {
            description: '鮮やかでコントラストの強いカラーでドラマティックな手元に',
            recommended: [
                { name: 'トゥルーレッド', color: '#FF0000', description: 'ドラマティック' },
                { name: 'ブラック', color: '#000000', description: 'モードに' },
                { name: 'ロイヤルブルー', color: '#4169E1', description: '鮮やかに' },
                { name: 'フューシャ', color: '#FF00FF', description: '華やかに' },
                { name: 'シルバー', color: '#C0C0C0', description: 'クールに' },
                { name: 'ワインレッド', color: '#722F37', description: '大人っぽく' }
            ]
        }
    }
};

// 骨格診断データ
const SKELETON_DATA = {
    straight: {
        name: '骨格ストレート',
        nameEn: 'STRAIGHT TYPE',
        description: 'メリハリのある立体的なボディライン。シンプルでクラス感のあるスタイルが得意です。',
        materials: [
            { name: 'ハリのある素材', description: 'コットン、シルク、高品質なウールなど', imgColor: '#8C705F' },
            { name: 'ジャストサイズのアイテム', description: 'Vネックニット、タイトスカート、テーラードジャケット', imgColor: '#4A5568' }
        ]
    },
    wave: {
        name: '骨格ウェーブ',
        nameEn: 'WAVE TYPE',
        description: '華奢で柔らかな曲線を描くボディライン。フェミニンなスタイルが得意です。',
        materials: [
            { name: '透け感・柔らかい素材', description: 'シフォン、モヘア、ツイードなど', imgColor: '#D8B4E2' },
            { name: '装飾的なアイテム', description: 'フリルブラウス、フレアスカート、ハイウエスト', imgColor: '#FBB6CE' }
        ]
    },
    natural: {
        name: '骨格ナチュラル',
        nameEn: 'NATURAL TYPE',
        description: '骨や関節がしっかりしたスタイリッシュなボディライン。ラフでカジュアルなスタイルが得意です。',
        materials: [
            { name: '天然素材・ざっくりした素材', description: 'リネン、デニム、コーデュロイなど', imgColor: '#8E9A78' },
            { name: 'オーバーサイズのアイテム', description: 'ロングカーディガン、ワイドパンツ、マキシ丈スカート', imgColor: '#A0AEC0' }
        ]
    }
};

export { PERSONAL_COLOR_DATA, SKELETON_DATA };
