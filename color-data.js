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
        }
    }
};

export { PERSONAL_COLOR_DATA };
