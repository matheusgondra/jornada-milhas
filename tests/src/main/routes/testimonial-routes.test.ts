import request from "supertest";
import app from "../../../../src/main/config/app";
import { PrismaHelper } from "../../../helpers/prisma-helper";

describe("Testimonial Routes", () => {
	beforeEach(async () => {
		await PrismaHelper.connect();
	});

	afterEach(async () => {
		await PrismaHelper.disconnect();
	});

	describe("POST /depoimentos", () => {
		it("Should returns an testimonial on success", async () => {
			await request(app)
				.post("/depoimentos")
				.send({
					name: "John",
					photo: "https://lh3.googleusercontent.com/pw/AIL4fc9UlFXaK0oQ9WxcqfNibYXxSEsnFI0zrH5EYk3JjHqbsIB3GCJ--qNBm5GRpYfDml2W2s55AgrvQh82U71_jlLuhesbGT7n_L7gFNtv2goPU3-udEgHYSYEuKaZbWlOSnj-6klCT-fMRyxcgExFQdwdK3eHtQnimqWYIsJLJ_hVrLBZnWMwslpIIe1wsKTkSIu-3_qNS7GA3IOzha6fuqOYttuBsbObjKSznyWcgOGBR992DbhhDRidVCCy44NcdIA0PtC2emyBm7ec-6938a_lscGhMz1g2YVr-wvkRua7SwW6b-usDh8hsARb6aqxUoWanSwriDEqegoCVCS6unfQLp3A0v2GLvjFkiXp-tzfJKlV9S-1-Q5tju6MadWORxX-BpT4DE7jf7LaqOp86uOtaQ-MStUWSTNtdK1f8wcOohzmAudutEdcj_Y9unuVkTsujq6ldsQtqNaSL9PUMDiENS5QvAVnseYOgs7rBkoBwveT-E_p8qjWYi-FRqCtHqtMRp0aCuyGTfjF0L68kKESyfANIseYyHvYkNoJ4CrH4PGIEI7lr3fhKafJdyq08AiaCHTvfZDlbnsRKFXM4WUcN6RFEvs8-8sDOcaDUzR3YTQev3kFH6mQEuKmNiHX_e_DrweiJrQ2snvn9ao2GFtD7oWuJtq8-x1bbxPwDuM2FW5wuAz2MriW_1p2sZDdB-BCnAThpA91sNizo8P7bjvTEOluMv0FMv7xJYDwolGhzuaGzjTv7gCsyyYBRCea55MmlEzzCl65NCuglqsiTj9JGHq7qqUD53kmG3G_K2SSIVyYWxPBLLZq41sVdpXatN2VzAnkx5Forr-AGpbRk9c1V4lK8JbsyTsM-kuOHVhHZETWLT6-dHI8Yt-bfRBI1q8RsmMa_UhBgzuFmPZc1u9SCbc=w1048-h923-s-no?authuser=0",
					testimonial: "Achei muito patetico"
				})
				.expect(201);
		});
	});

	describe("GET /depoimentos", () => {
		it("Should returns the testimonials on success", async () => {
			await request(app).post("/depoimentos").send({
				name: "John",
				photo: "https://lh3.googleusercontent.com/pw/AIL4fc9UlFXaK0oQ9WxcqfNibYXxSEsnFI0zrH5EYk3JjHqbsIB3GCJ--qNBm5GRpYfDml2W2s55AgrvQh82U71_jlLuhesbGT7n_L7gFNtv2goPU3-udEgHYSYEuKaZbWlOSnj-6klCT-fMRyxcgExFQdwdK3eHtQnimqWYIsJLJ_hVrLBZnWMwslpIIe1wsKTkSIu-3_qNS7GA3IOzha6fuqOYttuBsbObjKSznyWcgOGBR992DbhhDRidVCCy44NcdIA0PtC2emyBm7ec-6938a_lscGhMz1g2YVr-wvkRua7SwW6b-usDh8hsARb6aqxUoWanSwriDEqegoCVCS6unfQLp3A0v2GLvjFkiXp-tzfJKlV9S-1-Q5tju6MadWORxX-BpT4DE7jf7LaqOp86uOtaQ-MStUWSTNtdK1f8wcOohzmAudutEdcj_Y9unuVkTsujq6ldsQtqNaSL9PUMDiENS5QvAVnseYOgs7rBkoBwveT-E_p8qjWYi-FRqCtHqtMRp0aCuyGTfjF0L68kKESyfANIseYyHvYkNoJ4CrH4PGIEI7lr3fhKafJdyq08AiaCHTvfZDlbnsRKFXM4WUcN6RFEvs8-8sDOcaDUzR3YTQev3kFH6mQEuKmNiHX_e_DrweiJrQ2snvn9ao2GFtD7oWuJtq8-x1bbxPwDuM2FW5wuAz2MriW_1p2sZDdB-BCnAThpA91sNizo8P7bjvTEOluMv0FMv7xJYDwolGhzuaGzjTv7gCsyyYBRCea55MmlEzzCl65NCuglqsiTj9JGHq7qqUD53kmG3G_K2SSIVyYWxPBLLZq41sVdpXatN2VzAnkx5Forr-AGpbRk9c1V4lK8JbsyTsM-kuOHVhHZETWLT6-dHI8Yt-bfRBI1q8RsmMa_UhBgzuFmPZc1u9SCbc=w1048-h923-s-no?authuser=0",
				testimonial: "Achei muito patetico"
			});

			const response = await request(app).get("/depoimentos");
			expect(response.statusCode).toBe(200);
			expect(response.body).toEqual([
				{
					id: 1,
					name: "John",
					photo: "https://lh3.googleusercontent.com/pw/AIL4fc9UlFXaK0oQ9WxcqfNibYXxSEsnFI0zrH5EYk3JjHqbsIB3GCJ--qNBm5GRpYfDml2W2s55AgrvQh82U71_jlLuhesbGT7n_L7gFNtv2goPU3-udEgHYSYEuKaZbWlOSnj-6klCT-fMRyxcgExFQdwdK3eHtQnimqWYIsJLJ_hVrLBZnWMwslpIIe1wsKTkSIu-3_qNS7GA3IOzha6fuqOYttuBsbObjKSznyWcgOGBR992DbhhDRidVCCy44NcdIA0PtC2emyBm7ec-6938a_lscGhMz1g2YVr-wvkRua7SwW6b-usDh8hsARb6aqxUoWanSwriDEqegoCVCS6unfQLp3A0v2GLvjFkiXp-tzfJKlV9S-1-Q5tju6MadWORxX-BpT4DE7jf7LaqOp86uOtaQ-MStUWSTNtdK1f8wcOohzmAudutEdcj_Y9unuVkTsujq6ldsQtqNaSL9PUMDiENS5QvAVnseYOgs7rBkoBwveT-E_p8qjWYi-FRqCtHqtMRp0aCuyGTfjF0L68kKESyfANIseYyHvYkNoJ4CrH4PGIEI7lr3fhKafJdyq08AiaCHTvfZDlbnsRKFXM4WUcN6RFEvs8-8sDOcaDUzR3YTQev3kFH6mQEuKmNiHX_e_DrweiJrQ2snvn9ao2GFtD7oWuJtq8-x1bbxPwDuM2FW5wuAz2MriW_1p2sZDdB-BCnAThpA91sNizo8P7bjvTEOluMv0FMv7xJYDwolGhzuaGzjTv7gCsyyYBRCea55MmlEzzCl65NCuglqsiTj9JGHq7qqUD53kmG3G_K2SSIVyYWxPBLLZq41sVdpXatN2VzAnkx5Forr-AGpbRk9c1V4lK8JbsyTsM-kuOHVhHZETWLT6-dHI8Yt-bfRBI1q8RsmMa_UhBgzuFmPZc1u9SCbc=w1048-h923-s-no?authuser=0",
					testimonial: "Achei muito patetico"
				}
			]);
		});
	});

	describe("GET /depoimentos/:testimonialId", () => {
		it("Should returns the testimonial on success", async () => {
			await request(app).post("/depoimentos").send({
				name: "John",
				photo: "https://lh3.googleusercontent.com/pw/AIL4fc9UlFXaK0oQ9WxcqfNibYXxSEsnFI0zrH5EYk3JjHqbsIB3GCJ--qNBm5GRpYfDml2W2s55AgrvQh82U71_jlLuhesbGT7n_L7gFNtv2goPU3-udEgHYSYEuKaZbWlOSnj-6klCT-fMRyxcgExFQdwdK3eHtQnimqWYIsJLJ_hVrLBZnWMwslpIIe1wsKTkSIu-3_qNS7GA3IOzha6fuqOYttuBsbObjKSznyWcgOGBR992DbhhDRidVCCy44NcdIA0PtC2emyBm7ec-6938a_lscGhMz1g2YVr-wvkRua7SwW6b-usDh8hsARb6aqxUoWanSwriDEqegoCVCS6unfQLp3A0v2GLvjFkiXp-tzfJKlV9S-1-Q5tju6MadWORxX-BpT4DE7jf7LaqOp86uOtaQ-MStUWSTNtdK1f8wcOohzmAudutEdcj_Y9unuVkTsujq6ldsQtqNaSL9PUMDiENS5QvAVnseYOgs7rBkoBwveT-E_p8qjWYi-FRqCtHqtMRp0aCuyGTfjF0L68kKESyfANIseYyHvYkNoJ4CrH4PGIEI7lr3fhKafJdyq08AiaCHTvfZDlbnsRKFXM4WUcN6RFEvs8-8sDOcaDUzR3YTQev3kFH6mQEuKmNiHX_e_DrweiJrQ2snvn9ao2GFtD7oWuJtq8-x1bbxPwDuM2FW5wuAz2MriW_1p2sZDdB-BCnAThpA91sNizo8P7bjvTEOluMv0FMv7xJYDwolGhzuaGzjTv7gCsyyYBRCea55MmlEzzCl65NCuglqsiTj9JGHq7qqUD53kmG3G_K2SSIVyYWxPBLLZq41sVdpXatN2VzAnkx5Forr-AGpbRk9c1V4lK8JbsyTsM-kuOHVhHZETWLT6-dHI8Yt-bfRBI1q8RsmMa_UhBgzuFmPZc1u9SCbc=w1048-h923-s-no?authuser=0",
				testimonial: "Achei muito patetico"
			});

			const response = await request(app).get("/depoimentos/1");
			expect(response.statusCode).toBe(200);
			expect(response.body).toEqual({
				id: 1,
				name: "John",
				photo: "https://lh3.googleusercontent.com/pw/AIL4fc9UlFXaK0oQ9WxcqfNibYXxSEsnFI0zrH5EYk3JjHqbsIB3GCJ--qNBm5GRpYfDml2W2s55AgrvQh82U71_jlLuhesbGT7n_L7gFNtv2goPU3-udEgHYSYEuKaZbWlOSnj-6klCT-fMRyxcgExFQdwdK3eHtQnimqWYIsJLJ_hVrLBZnWMwslpIIe1wsKTkSIu-3_qNS7GA3IOzha6fuqOYttuBsbObjKSznyWcgOGBR992DbhhDRidVCCy44NcdIA0PtC2emyBm7ec-6938a_lscGhMz1g2YVr-wvkRua7SwW6b-usDh8hsARb6aqxUoWanSwriDEqegoCVCS6unfQLp3A0v2GLvjFkiXp-tzfJKlV9S-1-Q5tju6MadWORxX-BpT4DE7jf7LaqOp86uOtaQ-MStUWSTNtdK1f8wcOohzmAudutEdcj_Y9unuVkTsujq6ldsQtqNaSL9PUMDiENS5QvAVnseYOgs7rBkoBwveT-E_p8qjWYi-FRqCtHqtMRp0aCuyGTfjF0L68kKESyfANIseYyHvYkNoJ4CrH4PGIEI7lr3fhKafJdyq08AiaCHTvfZDlbnsRKFXM4WUcN6RFEvs8-8sDOcaDUzR3YTQev3kFH6mQEuKmNiHX_e_DrweiJrQ2snvn9ao2GFtD7oWuJtq8-x1bbxPwDuM2FW5wuAz2MriW_1p2sZDdB-BCnAThpA91sNizo8P7bjvTEOluMv0FMv7xJYDwolGhzuaGzjTv7gCsyyYBRCea55MmlEzzCl65NCuglqsiTj9JGHq7qqUD53kmG3G_K2SSIVyYWxPBLLZq41sVdpXatN2VzAnkx5Forr-AGpbRk9c1V4lK8JbsyTsM-kuOHVhHZETWLT6-dHI8Yt-bfRBI1q8RsmMa_UhBgzuFmPZc1u9SCbc=w1048-h923-s-no?authuser=0",
				testimonial: "Achei muito patetico"
			});
		});
	});
});