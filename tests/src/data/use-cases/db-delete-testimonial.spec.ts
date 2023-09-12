import { DeleteTestimonialRepository } from "../../../../src/data/protocols";
import { DbDeleteTestimonial } from "../../../../src/data/use-cases";

const makeDeleteTestimonialRepository = (): DeleteTestimonialRepository => {
	class DeleteTestimonialRepositoryStub
		implements DeleteTestimonialRepository
	{
		async delete(
			testimonialId: DeleteTestimonialRepository.Params
		): Promise<DeleteTestimonialRepository.Result> {
			return true;
		}
	}
	return new DeleteTestimonialRepositoryStub();
};

interface SutTypes {
	sut: DbDeleteTestimonial;
	deleteTestimonialRepositoryStub: DeleteTestimonialRepository;
}

const makeSut = (): SutTypes => {
	const deleteTestimonialRepositoryStub = makeDeleteTestimonialRepository();
	const sut = new DbDeleteTestimonial({
		deleteTestimonialRepository: deleteTestimonialRepositoryStub
	});
	return {
		sut,
		deleteTestimonialRepositoryStub
	};
};

describe("DbDeleteTestimonial", () => {
	it("Should call DeleteTestimonialRepository with correct values", async () => {
		const { sut, deleteTestimonialRepositoryStub } = makeSut();
		const deleteSpy = jest.spyOn(deleteTestimonialRepositoryStub, "delete");
		await sut.delete(1);
		expect(deleteSpy).toHaveBeenCalledWith(1);
	});

	it("Should throw if DeleteTestimonialRepository throws", async () => {
		const { sut, deleteTestimonialRepositoryStub } = makeSut();
		jest
			.spyOn(deleteTestimonialRepositoryStub, "delete")
			.mockRejectedValueOnce(new Error());
		const promise = sut.delete(1);
		await expect(promise).rejects.toThrow();
	});
});
