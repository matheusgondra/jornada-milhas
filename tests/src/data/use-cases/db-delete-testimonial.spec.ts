import { DeleteTestimonialRepository } from "../../../../src/data/protocols";
import { DbDeleteTestimonial } from "../../../../src/data/use-cases";

describe("DbDeleteTestimonial", () => {
	it("Should call DeleteTestimonialRepository with correct values", async () => {
		class DeleteTestimonialRepositoryStub
			implements DeleteTestimonialRepository
		{
			async delete(
				testimonialId: DeleteTestimonialRepository.Params
			): Promise<DeleteTestimonialRepository.Result> {
				return true;
			}
		}
		const deleteTestimonialRepositoryStub =
			new DeleteTestimonialRepositoryStub();
		const sut = new DbDeleteTestimonial({
			deleteTestimonialRepository: deleteTestimonialRepositoryStub
		});
		const deleteSpy = jest.spyOn(deleteTestimonialRepositoryStub, "delete");
		await sut.delete(1);
		expect(deleteSpy).toHaveBeenCalledWith(1);
	});
});
