import AWS from "aws-sdk";

//aws 로그인
AWS.config.update({
  credentials: {
    accessKeyId: process.env.S3_ID,
    secretAccessKey: process.env.S3_KEY,
  },
});

//url 을 반환한다.
export const uploadPhoto = async (file, userId) => {
  const { createReadStream, filename } = await file;
  const photoName = `upload/${userId}-${Date.now()}-${filename}`;
  const upload = await new AWS.S3()
    .upload({
      Bucket: "myinstar-clone", //버킷 이름 넣고
      Key: photoName, //파일이름 넣고
      ACL: "public-read", //아무나 read 할 수 있음,
      Body: createReadStream(), //스트림이나 bolb binary 등 가능
    })
    .promise();

  return upload;
};
