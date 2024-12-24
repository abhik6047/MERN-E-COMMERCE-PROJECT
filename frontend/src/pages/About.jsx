import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";
import Title from "../components/Title";

const About = () => {
	return (
		<div>
			<div className="text-2xl text-center pt-8 border-t">
				<Title text1={"ABOUT"} text2={" US"} />
			</div>

			<div className="my-10 flex flex-col md:flex-row gap-16">
				<img
					src={assets.about_img}
					alt="About image"
					className="w-full md:max-w-[450px] "
				/>
				<div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
						atque facere cumque dignissimos sit doloremque quo ea, tenetur nisi!
						Optio veritatis, voluptas quisquam consectetur perspiciatis quas
						tenetur recusandae nesciunt atque!
					</p>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae quam
						molestiae pariatur cumque aliquid deserunt quas, quae ipsum nostrum,
						saepe voluptates quia recusandae illo rerum eum eius quibusdam error
						veniam.
					</p>
					<b className="text-gray-800">Our Mission</b>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
						nisi pariatur dolores cupiditate nesciunt nemo? Similique voluptate
						quos cumque eos beatae! Accusantium dignissimos molestiae doloribus
						provident nemo, hic consequuntur. Optio.
					</p>
				</div>
			</div>
			<div className="text-xl py-4">
				<Title text1={"WHY"} text2={" CHOOSE US"} />
			</div>

			<div className="flex flex-col md:flex-row text-sm mb-20">
				<div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
					<b>Quality Assurance:</b>
					<p className="text-gray-600 ">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
						adipisci ducimus harum consequatur libero dicta perferendis eligendi
						ipsa, maxime repellat! Commodi reiciendis minus, tempora deserunt
						distinctio ipsam. Veniam, harum illum?
					</p>
				</div>
				<div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
					<b>Convenience:</b>
					<p className="text-gray-600 ">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
						adipisci ducimus harum consequatur libero dicta perferendis eligendi
						ipsa, maxime repellat! Commodi reiciendis minus, tempora deserunt
						distinctio ipsam. Veniam, harum illum?
					</p>
				</div>
				<div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
					<b>Exceptional Customer Service:</b>
					<p className="text-gray-600 ">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
						adipisci ducimus harum consequatur libero dicta perferendis eligendi
						ipsa, maxime repellat! Commodi reiciendis minus, tempora deserunt
						distinctio ipsam. Veniam, harum illum?
					</p>
				</div>
			</div>
			<NewsletterBox />
		</div>
	);
};

export default About;
