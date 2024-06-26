import { S3 } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";
import os from "os";

export async function downloadFromS3(file_key: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const s3 = new S3({
        region: "ap-south-1",
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
        },
      });
      const params = {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
        Key: file_key,
      };

      const obj = await s3.getObject(params);
      const tempDir = os.tmpdir(); // Get the system's temporary directory
      const fileName = `namda${Date.now().toString()}.pdf`;
      const filePath = path.join(tempDir, fileName);

      if (obj.Body instanceof require("stream").Readable) {
        // AWS-SDK v3 has some issues with their TypeScript definitions, but this works
        // https://github.com/aws/aws-sdk-js-v3/issues/843
        // Open the writable stream and write the file
        const file = fs.createWriteStream(filePath);
        file.on("open", function (fd) {
          // @ts-ignore
          obj.Body?.pipe(file).on("finish", () => {
            return resolve(filePath);
          });
        });
        // obj.Body?.pipe(fs.createWriteStream(filePath));
      }
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

// downloadFromS3("uploads/1693568801787chongzhisheng_resume.pdf");
