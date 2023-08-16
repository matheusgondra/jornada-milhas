import { UpdateTestimonialRepository } from "../../../../src/data/protocols";
import { DbUpdateTestimonial } from "../../../../src/data/use-cases";

describe("DbUpdateTestimonial", () => {
	it("Should call UpdateTestimonialRepository with correct values", async () => {
		class UpdateTestimonialRepositoryStub
			implements UpdateTestimonialRepository
		{
			async update(
				data: UpdateTestimonialRepository.Params
			): Promise<UpdateTestimonialRepository.Result> {
				return {
					id: 1,
					name: "any_name",
					testimonial: "any_testimonial",
					photo: "any_photo"
				};
			}
		}
		const updateTestimonialRepositoryStub =
			new UpdateTestimonialRepositoryStub();
		const sut = new DbUpdateTestimonial({
			updateTestimonialRepository: updateTestimonialRepositoryStub
		});
		const updateSpy = jest.spyOn(updateTestimonialRepositoryStub, "update");
		const data = {
			testimonialId: 1,
			data: {
				testimonial: "any_testimonial",
				photo: "any_photo"
			}
		};
		await sut.update(data);
		expect(updateSpy).toHaveBeenCalledWith(data);
	});
});
