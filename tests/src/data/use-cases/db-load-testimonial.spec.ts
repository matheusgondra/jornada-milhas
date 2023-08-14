import { DbLoadTestimonial } from "../../../../src/data/use-cases";
import { LoadTestimonial } from "../../../../src/domain";

const makeLoadTestimonialRepositoryStub = (): LoadTestimonial => {
	class LoadTestimonialRepositoryStub implements LoadTestimonial {
		async load(
			testimonialId: LoadTestimonial.Params
		): Promise<LoadTestimonial.Result> {
			return {
				id: 1,
				name: "any_name",
				photo: "any_photo",
				testimonial: "any_testimonial"
			};
		}
	}
	return new LoadTestimonialRepositoryStub();
};

interface SutTypes {
	sut: DbLoadTestimonial;
	loadTestimonialRepositoryStub: LoadTestimonial;
}

const makeSut = (): SutTypes => {
	const loadTestimonialRepositoryStub = makeLoadTestimonialRepositoryStub();
	const sut = new DbLoadTestimonial({
		loadTestimonialRepository: loadTestimonialRepositoryStub
	});
	return {
		sut,
		loadTestimonialRepositoryStub
	};
};

describe("DbLoadTestimonial", () => {
	it("Should call LoadTestimonialRepository", async () => {
		const { sut, loadTestimonialRepositoryStub } = makeSut();
		const loadSpy = jest.spyOn(loadTestimonialRepositoryStub, "load");
		await sut.load(1);
		expect(loadSpy).toBeCalledWith(1);
	});

	it("Should throw if LoadTestimonialRepository throws", async () => {
		const { sut, loadTestimonialRepositoryStub } = makeSut();
		jest
			.spyOn(loadTestimonialRepositoryStub, "load")
			.mockRejectedValueOnce(new Error());
		const promise = sut.load(1);
		await expect(promise).rejects.toThrow();
	});
});
