import parser from "./JsonParser";
import jsonAudioBook from "./audiobook.json"
import jsonCourse from "./course.json"

test("parsing audiobook", async () => {
    const result = parser.parse(JSON.stringify(jsonAudioBook));

    expect(result).toEqual([
        "https://images.books24x7.com/coverimages/115235.png",
        "https://cdn2.percipio.com/1656832412.4da6de1d83806f5d78c365aec68e3ca717945ce9/eod/books/115235/downloadmedia/Books24x7-Delegation_&_Supervision-Audio.mp4"
    ]);
});

test("parsing course", async () => {
    const result = parser.parse(JSON.stringify(jsonCourse));
    expect(result).toEqual([
        "https://cdn2.percipio.com/public/b/e0586990-0507-11e7-89ad-0242c0a80b08/image009.jpg",
        "https://cdn2.percipio.com/secure/c/1656810859.e8b8dbe11fc5c21429ddaf04f10594d6acf861b2/eot/transcripts/2aa377ad-389d-4cce-aa93-0e1d55566f92/bs_amg02_a01_enus.html",
        "https://cdn2.percipio.com/public/b/00bd2e80-31fb-11e7-803e-0242c0a80b05/image004.jpg",
        "https://cdn1.percipio.com/1656832508_c866991cccaf05309ad9f504f0587e8121fd6e70/5adaf826-d268-4591-8e0e-edbd7855a0a9/720_1200kps,540_600kps,360_400kps.m3u8",
        "https://cdn1.percipio.com/1656832508_c866991cccaf05309ad9f504f0587e8121fd6e70/5adaf826-d268-4591-8e0e-edbd7855a0a9/720_1200kps,540_600kps,360_400kps,180_64kps.m3u8",
        "https://cdn2.percipio.com/secure/b/1656832508.23133a40c81b70fd9c8d8ebeee26c6f311a200f5/eot/5adaf826-d268-4591-8e0e-edbd7855a0a9/720_1200kps.mp4",
        "https://cdn1.percipio.com/1656832508_c866991cccaf05309ad9f504f0587e8121fd6e70/5adaf826-d268-4591-8e0e-edbd7855a0a9/720_1200kps,540_600kps,360_400kps.mpd",
        "https://cdn1.percipio.com/1656832508_c866991cccaf05309ad9f504f0587e8121fd6e70/5adaf826-d268-4591-8e0e-edbd7855a0a9/720_1200kps,540_600kps,360_400kps,180_64kps.mpd",
        "https://cdn2.percipio.com/secure/c/1656832508.f16852bbc0cee2148cdc2a7baca23fdd0c53a43e/eot/video/captions/saved/2df16270-a370-4971-8a4c-bf50dcc83d30.vtt",
        "https://cdn2.percipio.com/public/b/798c75fa-0129-4295-82b3-d1281d8b5882/image001.jpg",
        "https://cdn1.percipio.com/1656832508_faf012f14aa8b0f4085a65f062f99f82b59834d1/798c75fa-0129-4295-82b3-d1281d8b5882/1080_4000kps,720_2200kps,450_800kps,270_600kps,180_400kps.m3u8",
        "https://cdn1.percipio.com/1656832508_faf012f14aa8b0f4085a65f062f99f82b59834d1/798c75fa-0129-4295-82b3-d1281d8b5882/1080_4000kps,720_2200kps,450_800kps,270_600kps,180_400kps,180_64kps.m3u8",
        "https://cdn2.percipio.com/secure/b/1656832508.824fb95d65a2b24e58e744eb7a73abac95574b88/eot/798c75fa-0129-4295-82b3-d1281d8b5882/720_2200kps.mp4",
        "https://cdn1.percipio.com/1656832508_faf012f14aa8b0f4085a65f062f99f82b59834d1/798c75fa-0129-4295-82b3-d1281d8b5882/1080_4000kps,720_2200kps,450_800kps,270_600kps,180_400kps.mpd",
        "https://cdn1.percipio.com/1656832508_faf012f14aa8b0f4085a65f062f99f82b59834d1/798c75fa-0129-4295-82b3-d1281d8b5882/1080_4000kps,720_2200kps,450_800kps,270_600kps,180_400kps,180_64kps.mpd",
        "https://cdn2.percipio.com/secure/c/1656832508.4650c96a55144b44ec93ecdbd11c2cb9b7f2a071/eot/video/captions/saved/18f09a51-4d13-4a3b-ab65-0fea536ed436.vtt",
        "https://cdn2.percipio.com/public/b/1cf1ff0e-6d42-4d2d-be9a-75bcc281339d/image001.jpg",
        "https://cdn1.percipio.com/1656832508_bc7c99499a8f27426da812c0251a7bf3e61e5af8/1cf1ff0e-6d42-4d2d-be9a-75bcc281339d/1080_4000kps,720_2200kps,450_800kps,270_600kps,180_400kps.m3u8",
        "https://cdn1.percipio.com/1656832508_bc7c99499a8f27426da812c0251a7bf3e61e5af8/1cf1ff0e-6d42-4d2d-be9a-75bcc281339d/1080_4000kps,720_2200kps,450_800kps,270_600kps,180_400kps,180_64kps.m3u8",
        "https://cdn2.percipio.com/secure/b/1656832508.3587c9d80497575c57aa59200328baf8bc58cab5/eot/1cf1ff0e-6d42-4d2d-be9a-75bcc281339d/720_2200kps.mp4",
        "https://cdn1.percipio.com/1656832508_bc7c99499a8f27426da812c0251a7bf3e61e5af8/1cf1ff0e-6d42-4d2d-be9a-75bcc281339d/1080_4000kps,720_2200kps,450_800kps,270_600kps,180_400kps.mpd",
        "https://cdn1.percipio.com/1656832508_bc7c99499a8f27426da812c0251a7bf3e61e5af8/1cf1ff0e-6d42-4d2d-be9a-75bcc281339d/1080_4000kps,720_2200kps,450_800kps,270_600kps,180_400kps,180_64kps.mpd",
        "https://cdn2.percipio.com/secure/c/1656832508.33cddc6f8c3518086dbc7be1daf37a2ca14ded71/eot/video/captions/saved/da67f68b-ffbe-434c-afe7-f19b304b84cc.vtt",
        "https://cdn2.percipio.com/public/b/24ad0127-98c3-40ba-8e9a-9072bcce993c/image001.jpg",
        "https://cdn1.percipio.com/1656832508_dacec1e67a4109b6e7be4873cfe06fd0a3863c17/24ad0127-98c3-40ba-8e9a-9072bcce993c/1080_4000kps,720_2200kps,450_800kps,270_600kps,180_400kps.m3u8",
        "https://cdn1.percipio.com/1656832508_dacec1e67a4109b6e7be4873cfe06fd0a3863c17/24ad0127-98c3-40ba-8e9a-9072bcce993c/1080_4000kps,720_2200kps,450_800kps,270_600kps,180_400kps,180_64kps.m3u8",
        "https://cdn2.percipio.com/secure/b/1656832508.c8d2465ce5ca29dce7012d1d09025dcfc54065db/eot/24ad0127-98c3-40ba-8e9a-9072bcce993c/720_2200kps.mp4",
        "https://cdn1.percipio.com/1656832508_dacec1e67a4109b6e7be4873cfe06fd0a3863c17/24ad0127-98c3-40ba-8e9a-9072bcce993c/1080_4000kps,720_2200kps,450_800kps,270_600kps,180_400kps.mpd",
        "https://cdn1.percipio.com/1656832508_dacec1e67a4109b6e7be4873cfe06fd0a3863c17/24ad0127-98c3-40ba-8e9a-9072bcce993c/1080_4000kps,720_2200kps,450_800kps,270_600kps,180_400kps,180_64kps.mpd",
        "https://cdn2.percipio.com/secure/c/1656832508.7154648325e46dd1b03336ec18fed5b583ca5a0f/eot/video/captions/saved/a9b0c56a-9866-42d3-b907-33a90363fae5.vtt",
        "https://cdn1.percipio.com/1656832508_3227ee0eaf0a59d1e7068c48d3f3402071e5064c/022bf3c9-ae1f-4342-ac8e-cdc496098a01/1080_4000kps,720_2200kps,450_800kps,270_600kps,180_400kps.m3u8",
        "https://cdn1.percipio.com/1656832508_3227ee0eaf0a59d1e7068c48d3f3402071e5064c/022bf3c9-ae1f-4342-ac8e-cdc496098a01/1080_4000kps,720_2200kps,450_800kps,270_600kps,180_400kps,180_64kps.m3u8",
        "https://cdn2.percipio.com/secure/b/1656832508.3c4ac8589772c9765ec006da71672ce59ccf95cc/eot/022bf3c9-ae1f-4342-ac8e-cdc496098a01/720_2200kps.mp4",
        "https://cdn1.percipio.com/1656832508_3227ee0eaf0a59d1e7068c48d3f3402071e5064c/022bf3c9-ae1f-4342-ac8e-cdc496098a01/1080_4000kps,720_2200kps,450_800kps,270_600kps,180_400kps.mpd",
        "https://cdn1.percipio.com/1656832508_3227ee0eaf0a59d1e7068c48d3f3402071e5064c/022bf3c9-ae1f-4342-ac8e-cdc496098a01/1080_4000kps,720_2200kps,450_800kps,270_600kps,180_400kps,180_64kps.mpd",
        "https://cdn2.percipio.com/secure/c/1656832508.1044ca909538a697b78003c3e983ba45a8df0290/eot/video/captions/saved/abf37201-3ee1-4187-abc3-4040fbea8ba4.vtt",
        "https://cdn2.percipio.com/public/b/900e2016-39db-4353-a1de-cbeca75dcf86/image001.jpg",
        "https://cdn1.percipio.com/1656832508_2694690e7ba623303315e5ee79f79ccf43bf32c5/900e2016-39db-4353-a1de-cbeca75dcf86/1080_4000kps,720_2200kps,450_800kps,270_600kps,180_400kps.m3u8",
        "https://cdn1.percipio.com/1656832508_2694690e7ba623303315e5ee79f79ccf43bf32c5/900e2016-39db-4353-a1de-cbeca75dcf86/1080_4000kps,720_2200kps,450_800kps,270_600kps,180_400kps,180_64kps.m3u8",
        "https://cdn2.percipio.com/secure/b/1656832508.e091ea758a9f928f073468cf2a0d08ddb5ef4ca4/eot/900e2016-39db-4353-a1de-cbeca75dcf86/720_2200kps.mp4",
        "https://cdn1.percipio.com/1656832508_2694690e7ba623303315e5ee79f79ccf43bf32c5/900e2016-39db-4353-a1de-cbeca75dcf86/1080_4000kps,720_2200kps,450_800kps,270_600kps,180_400kps.mpd",
        "https://cdn1.percipio.com/1656832508_2694690e7ba623303315e5ee79f79ccf43bf32c5/900e2016-39db-4353-a1de-cbeca75dcf86/1080_4000kps,720_2200kps,450_800kps,270_600kps,180_400kps,180_64kps.mpd",
        "https://cdn2.percipio.com/secure/c/1656832508.73f5df1f4f71f0e679c0b2df090451281daaf774/eot/video/captions/saved/a9048e7c-60e9-43b9-9b03-ac98a55578cc.vtt",
        "https://cdn2.percipio.com/public/b/38eb743d-4ede-4f9a-9d50-bbd82d72437c/image001.jpg",
        "https://cdn1.percipio.com/1656832508_94558bdc069e469224dae12195c418795f72f666/38eb743d-4ede-4f9a-9d50-bbd82d72437c/1080_4000kps,720_2200kps,450_800kps,270_600kps,180_400kps.m3u8",
        "https://cdn1.percipio.com/1656832508_94558bdc069e469224dae12195c418795f72f666/38eb743d-4ede-4f9a-9d50-bbd82d72437c/1080_4000kps,720_2200kps,450_800kps,270_600kps,180_400kps,180_64kps.m3u8",
        "https://cdn2.percipio.com/secure/b/1656832508.85e0f7b1a757f7831714eccd4a4e9b7ca4c943b1/eot/38eb743d-4ede-4f9a-9d50-bbd82d72437c/720_2200kps.mp4",
        "https://cdn1.percipio.com/1656832508_94558bdc069e469224dae12195c418795f72f666/38eb743d-4ede-4f9a-9d50-bbd82d72437c/1080_4000kps,720_2200kps,450_800kps,270_600kps,180_400kps.mpd",
        "https://cdn1.percipio.com/1656832508_94558bdc069e469224dae12195c418795f72f666/38eb743d-4ede-4f9a-9d50-bbd82d72437c/1080_4000kps,720_2200kps,450_800kps,270_600kps,180_400kps,180_64kps.mpd",
        "https://cdn2.percipio.com/secure/c/1656832508.bac6704b21193ebcd3060643f61c39b9040f4c2a/eot/video/captions/saved/92290273-5a6b-4fe1-aa17-76588643abb9.vtt",
    ]);
});