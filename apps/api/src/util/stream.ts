import * as NodeFS from "node:fs";
import { Effect } from "effect";

/**
 * ファイルにデータを書き込んで、ストリームが終了した後にファイルをクリーンアップする
 * @param filename - データを書き込むファイルの名前
 * @param data - ファイルに書き込むデータ
 * @returns データをファイルに書き込んで、ストリームが終了した後にファイルをクリーンアップするEffect
 */
export const writeFileWithCleanup = (filename: string, data: string) =>
	Effect.async<void, Error>((resume) => {
		const writeStream = NodeFS.createWriteStream(filename);

		writeStream.write(data);

		writeStream.on("finish", () => resume(Effect.void));

		writeStream.on("error", (error) => resume(Effect.fail(error)));

		// クリーンアップ関数
		return Effect.sync(() => {
			console.log(`Cleaning up ${filename}`);
			NodeFS.unlinkSync(filename);
		});
	});
