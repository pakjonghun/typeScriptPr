export const getConnectOrCreate = (caption) => {
  const connectOrCreate = [];

  if (caption && caption.includes("#")) {
    //| 는 그룹 안에서만 사용!
    const tags = caption.match(/#[ㄱ-ㅎㅏ-ㅣ가-힣\w]+/gi);
    console.log(tags);
    for (let item of tags) {
      connectOrCreate.push({
        where: { hashtag: item },
        create: { hashtag: item },
      });
    }
  }
  return connectOrCreate;
};
