export const getConnectOrCreate = (caption) => {
  const connectOrCreate = [];

  if (caption && caption.includes("#")) {
    const tags = caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/gi);
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
