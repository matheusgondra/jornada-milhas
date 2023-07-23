import { AddTestimonialRepository } from "../../../../src/data/protocols";
import { DbAddTestimonial } from "../../../../src/data/use-cases";
import { AddTestimonialModel, TestimonialModel } from "../../../../src/domain";

describe("DbAddTestimonial", () => {
	it("Should call AddTestimonialRepository with correct values", async () => {
		class AddTestimonialRepositoryStub implements AddTestimonialRepository {
			async add(data: AddTestimonialModel): Promise<TestimonialModel> {
				return {
					id: 1,
					name: "any_name",
					photo: "any_photo",
					testimonial: "any_testimonial"
				};
			}
		}
		const addTestimonialRepositoryStub = new AddTestimonialRepositoryStub();
		const sut = new DbAddTestimonial(addTestimonialRepositoryStub);
		const addSpy = jest.spyOn(addTestimonialRepositoryStub, "add");
		const data = {
			name: "any_name",
			photo: "any_photo",
			testimonial: "any_testimonial"
		};
		await sut.add(data);
		expect(addSpy).toBeCalledWith(data);
	});
});
