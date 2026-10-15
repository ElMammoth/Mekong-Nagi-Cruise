import type { RatingSnapshot, Review, ReviewPlatform } from "./types";

/**
 * Customer reviews — genuine only.
 *
 * Rules (also checked by `npm test`):
 * 1. Copy each review exactly as published: same words, spelling and punctuation. Never
 *    edit, shorten inside a sentence or combine reviews. If you need it shorter, pick a
 *    different review.
 * 2. `reviewer` is the name exactly as the platform shows it.
 * 3. `url` is the link to that review (or to the listing page if the review has no link).
 * 4. Rating figures must match the platform on the day you copy them; put that day in `asOf`.
 *    Update them when you add reviews.
 *
 * Nothing is marked up as structured data: Google doesn't allow review rich results for
 * reviews collected on other sites.
 */

/**
 * Date the reviews and ratings below were last copied from the platforms (ISO "YYYY-MM-DD").
 * Shown on the site next to the reviews.
 */
export const reviewsRetrievedAt: string | null = "2026-10-14";

const VIATOR_LISTING =
  "https://www.viator.com/tours/Northern-Thailand/Nagi-of-Mekong-cruise/d22518-223302P2";
const tripadvisorReview = (id: string) =>
  `https://www.tripadvisor.fr/ShowUserReviews-g737155-d15773080-r${id}-Nagi_of_Mekong_Cruise-Huay_Xai_Bokeo_Province.html`;

export const reviewPlatforms: Record<ReviewPlatform, { name: string; listingUrl: string }> = {
  tripadvisor: {
    name: "Tripadvisor",
    listingUrl:
      "https://www.tripadvisor.fr/Attraction_Review-g737155-d15773080-Reviews-Nagi_of_Mekong_Cruise-Huay_Xai_Bokeo_Province.html",
  },
  viator: {
    name: "Viator",
    listingUrl: VIATOR_LISTING,
  },
};

/** Overall rating per platform, exactly as displayed on the listing page on `asOf`. */
export const ratings: RatingSnapshot[] = [
  {
    platform: "tripadvisor",
    rating: 4.9,
    count: 9,
    asOf: "2026-10-14",
    distribution: { 5: 8, 4: 1, 3: 0, 2: 0, 1: 0 },
  },
  {
    platform: "viator",
    rating: 4.8,
    count: 102,
    asOf: "2026-10-14",
    distribution: { 5: 92, 4: 6, 3: 3, 2: 0, 1: 1 },
    note: "Total reviews and rating from Viator & Tripadvisor",
  },
];

/**
 * Every review shown on the two listing pages on 2026-10-14: Viator shows 11 (and links to
 * Tripadvisor for the rest), Tripadvisor.fr shows all 9 once the language filter is cleared.
 * Title, text, name, rating and spelling are exactly as published; line breaks are kept as
 * "\n". Viator reviews have no link of their own, so they link to the listing.
 * Dates: Viator shows the month only; Tripadvisor shows the day the review was written.
 *
 * `placement` chooses where a review appears:
 * "offer" → the review cards next to the packages (up to 3),
 * "booking" → the single quote next to the booking form and call to action.
 * Every other review is listed under "Show all reviews".
 */
export const reviews: Review[] = [
  {
    platform: "viator",
    reviewer: "Sarah_F",
    date: "2025-03",
    rating: 5,
    title: "A 2-day sanctuary!",
    text: "The 2 day river cruise was enjoyable from start to finish. Our guide and boat crew were very hospitable - food and refreshments were constantly available. Our guide was informative of the local villages we stopped at along the river and took care of our transfers to and from the hotels and boat. The whole experience was so relaxing - I would definitely recommend!",
    url: VIATOR_LISTING,
    placement: "offer",
  },
  {
    platform: "tripadvisor",
    reviewer: "Luke W",
    date: "2025-10-09",
    rating: 5,
    title: "Excellent Experience",
    text: "Beautiful scenery, well-organised itinerary, and our guide La was very friendly and informative. The boat was spacious and comfortable, and the hours flew by in enjoyment and relaxation.",
    url: tripadvisorReview("1034022622"),
    placement: "offer",
  },
  {
    platform: "viator",
    reviewer: "Rosanna_D",
    date: "2024-08",
    rating: 5,
    title: "Great experience floating down the Mekong",
    text: "Comfortable boat with nice facilities, and the lunch each day was sooo good! Very helpful crew, everything was smoothly run. An incredible way to experience the Mekong river.",
    url: VIATOR_LISTING,
    placement: "offer",
  },
  {
    platform: "tripadvisor",
    reviewer: "julie f",
    date: "2022-12-13",
    rating: 5,
    title: "Definitely worth every penny",
    text: "The service was seamless crossing the border not having to worry about the bags and the trip down the Mekong was relaxing and quite scenic. The food was prepared by the captain wife and was very yummy. Our guide La was very informative and great to get to know his country .",
    url: tripadvisorReview("871577457"),
    placement: "booking",
  },
  {
    platform: "viator",
    reviewer: "Catherine_M",
    date: "2026-07",
    rating: 5,
    title: "Best experience",
    text: "An amazing experience the best way to see the country of Laos and to meet people from all over the world",
    url: VIATOR_LISTING,
  },
  {
    platform: "viator",
    reviewer: "James_T",
    date: "2026-02",
    rating: 4,
    title: "The smiling children Along the Mekong",
    text: "The villages you visit appear very dependant on tourist $. The children are beautiful. If you want to visit the villagers, you’ll require some physical strength and ability to ascendthe riverbank.",
    url: VIATOR_LISTING,
  },
  {
    platform: "tripadvisor",
    reviewer: "Tony W",
    date: "2026-02-04",
    rating: 5,
    title: "Zeer aangename reis over de Mekong naar Laos",
    lang: "nl",
    text: "Vanaf het moment dat ze mij zijn komen halen in mijn hotel in Chang Khong t/m ht afzetten in mijn hotel in Luang Prabang was deze reis perfect geregeld door Nagi\nDe reis over de Mekong verliep bijzonder aangenaam met fantastische uitzichten waarbij je extra kan genieten door gebruik te maken van het voor of achterdek en heerlijk van de zon kan genieten\nHet eten aan boord was heerlijk en vers gemaakt\nOnze gids Toey was zeer aardig en erg betrokken bij ons welzijn aan boord en gaf prima informatie tijdens onze stops bij enkele dorpen langs de Mekong\nReizen met Nagi of the Mekong is een bijzonder aangename kennismaking met Laos",
    url: tripadvisorReview("1048546626"),
  },
  {
    platform: "viator",
    reviewer: "Giulia_B",
    date: "2025-02",
    rating: 5,
    title: "We travelled during high...",
    text: "We travelled during high season so the boat was quite full nevertheless it was a very pleasant trip, helpful and friendly staff and such a perfectly relaxing way to while away 2 days of travelling. If I had to give a suggestion to Viator - specify whether you’re part of the package or not as it wasn’t clear if we had any accommodation in Pakbeng",
    url: VIATOR_LISTING,
  },
  {
    platform: "viator",
    reviewer: "Di_C",
    date: "2024-12",
    rating: 5,
    title: "The Best Way to Enter Laos",
    text: "This cruise was so good last year, I came back a second time. I enjoyed it so much again. The scenery is beautiful as we glide past at a pace it can be absorbed. We stopped at a Khmu village the first day, and having done the trip before, I knew that the under privileged children would love to receive some small little toys. It was a delight to give them that excitement. Lunch is delicious on board and a night at Pakbeng part of the adventure in to Laos. The second day also has two stop off points, I didn't bother with the Pak ou caves again, it didn't thrill me enough to climb the exhaustive steps to the upper cave a second time. A village stop to the usual whisky tasting and on to our destination Luang Prabang. You are looked after through the border crossing all the way to your accomodation at LP, accompanied by a local guide the whole time.",
    url: VIATOR_LISTING,
  },
  {
    platform: "viator",
    reviewer: "Per_K",
    date: "2024-12",
    rating: 5,
    title: "Good Work!",
    text: "The beautiful landscape and the friendly staff together with the excellent and professional guide made it a memorable experience.",
    url: VIATOR_LISTING,
  },
  {
    platform: "viator",
    reviewer: "EP_W",
    date: "2024-08",
    rating: 5,
    title: "Perfect! The best way to get to Luang Prabang...",
    text: "A wonderful trip and one of the highlights of our holiday to Thailand & Laos. Definitely the best way to travel from northern Thailand to Luang Prabang. Everything was smoothly organised and ran to time. Our guide was lovely - very friendly and helpful. We were worried that our three teens (18, 15 & 13) would get bored but they loved it too and made use of the lounge area to catch up on their sleep! I was also worried about feeling unsafe as I knew the river would be full during the wet season and although you would definitely not want to go overboard, I felt safe at all times. We also enjoyed chatting with the other passengers from all around the world and it has been lovely bumping into them again on our travels through Laos. The crew on board were also lovely and produced delicious food. You could also help yourself to water and hot drinks all day. The boat was very clean as was the ladies toilet. There was plenty of room to spread out, we were all given our own table areas and you could sit at the bow or stern and watch the amazing scenery go by. There was a lovely breeze so it didn't feel too hot. The visits to the villages and caves were interesting and it was lovely to meet the village children. I would recommend booking directly through Nagi of Mekong. Viator had not told them that we'd booked accommodation through Viator for the night in Pak Beng. Luckily our guide was able to sort it out for us, but if I did it again I would book it all through Nagi of Mekong. We booked the cheapest option for the accommodation which was pretty basic but fine for one night. There are a couple of ATMs in Pak Beng but one wasn't working. Take some USD just in case. I can definitely recommend this trip, a perfect half way between the cheapest option and the very expensive tours.",
    url: VIATOR_LISTING,
  },
  {
    platform: "viator",
    reviewer: "Robert_B",
    date: "2024-07",
    rating: 5,
    title: "Excellent trip, very comfortable, professional trip.",
    text: "This trip was the highlight of my visit to Lao. The tour guide was very personable, friendly and helpful. Food on the boat was terrific. I would even do this slow boat again the next time I am going to Lao.",
    url: VIATOR_LISTING,
  },
  {
    platform: "viator",
    reviewer: "Susan_N",
    date: "2024-02",
    rating: 5,
    title: "Enchanting Nagi River Cruise",
    text: "If you are looking to be enchanted by the serenity of mountains, forests, bluffs, sandbars, rural Moong life and the Mother River Mekong; empty your mind of all else save the dreamscape floating past you.",
    url: VIATOR_LISTING,
  },
  {
    platform: "viator",
    reviewer: "Frederick_B",
    date: "2024-02",
    rating: 5,
    title: "Highly recommend the trip",
    text: "Peaceful 2day cruise with lots of amazing scenery. The hotel for the overnight was not so great, but everything about the boat & staff, our guide sideburn was spot on 5 stars.",
    url: VIATOR_LISTING,
  },
  {
    platform: "tripadvisor",
    reviewer: "Alex",
    date: "2022-12-01",
    rating: 5,
    title: "Well-organised 2-day boat trip",
    text: "Picked us up from our guest house in Huay Xai in the morning and then took care of us all the way to our hotel in Luang Prabang 2 days later, including getting us to our hotel in Pak Beng on the first night. Guide spoke great English and was a lovely man. Lunch lunch on the boat was nice and they sold beer and soft drinks.",
    url: tripadvisorReview("870304495"),
  },
  {
    platform: "tripadvisor",
    reviewer: "Holly",
    date: "2022-11-04",
    rating: 5,
    title: "Amazing experience",
    text: "This was a brilliant way of travelling from northern Thailand to Laos. Would recommend for any travellers who have the time as this was a brilliant experience.",
    url: tripadvisorReview("867175050"),
  },
  {
    platform: "tripadvisor",
    reviewer: "mprmpr",
    date: "2019-11-02",
    rating: 5,
    title: "No Better Way to Cruise the Mekong than Nagi!",
    text: "From the ease of booking for 8, including navigating the crossing from Thailand into Laos, to the lazy float down the river on a charming craft with plenty of room to spread out and take in the scenery, to the excursions to visit off-the-beaten-path villages, the Nagi of Mekong Cruise was a highlight of our 3-week SEA trip. Adisak was incredibly helpful with making arrangements, even providing translation services, in advance of our trip. We were picked up from our Chiang Rai hotel on time, delivered to the border crossing with assistance on both sides, then ushered on to a traditional (and very clean) boat manned by a wonderful Lao family and our terrific guide, Xay, who saw to our every need and comfort. We had about 20 passengers on board a vessel that could accommodate twice that, so you could easily move around to getter a better view-- or take a snooze. Waters and beers (BeerLao!) were chilled, and really tasty, authentic meals prepared by the Captain's wife made the slow cruising idyllic. The excursions were a pleasant surprise too, giving insight into how these communities perched on the riverside slopes sustain themselves. We loved our overnight at the Sanctuary Hotel in Pakbeng (elephants across the way!), but that's another review altogether. You don't need to spend more on a \"fancier\" cruise; this is the real deal!",
    url: tripadvisorReview("723309817"),
  },
  {
    platform: "tripadvisor",
    reviewer: "hlm857",
    date: "2019-09-02",
    rating: 5,
    title: "Amazing!",
    text: "Loved this cruise on the Mekong. The Nagi of Mekong cruise company made booking really smooth and easy. A couple of emails back and forth between myself and Adisak and it was all sorted! We stayed in Chiang khong the night before the boarder crossing to Laos, the company personally brought visa documents to our hotel to fill in to make our crossing easier. They picked us up from out hotel in chiang khong on the morning of the cruise and escorted us across the boarder assisting us a long the way, eg, where to go, who to speak to, where to sign, which bus etc. Everything went smoothly and we were on the boat before we knew it! The cruise itself is magical and has so much beautiful scenery that you would never get to see otherwise, plus first had views of life of the locals on the river. The food was awesome, with vegan and meat options provided, free tea, coffee and water! And they gave us regular chilled wipes to cool us off.\nThe visit to the Laos village was interesting although, the people who owned the boat gave out clothes and food which we felt had we know this happened previously we could have contributed to, as at the time we had brought nothing to give them. The Pak Ou caves are super interesting, but be warned the locals there try to sell you tiny birds in cages, if you buy these If means they will catch more knowing it is making them money. When the birds are released (usually in the city) they can’t survive and will fly into power lines etc by accident. Our boat was super chilled out and had loads of space to move around (I think because of low season) but this was perfect. Pak beng where you stop half way is a qauint little town, there isn’t a lot to do but there is lots of restaurants to go to and 2 pubs. The hotel is beautiful. Two lazy days on the river were amazing, the highlight of Asia so far! Thank you nagi of Mekong!",
    url: tripadvisorReview("705689957"),
  },
  {
    platform: "tripadvisor",
    reviewer: "Beacygirl",
    date: "2019-05-05",
    rating: 5,
    title: "Brilliant!",
    text: "Heading down the Mekong in a private slow boat is the height of relaxation and a fabulous introduction to Northern Laos. Khamlar our guide was a gem, a wealth of knowledge who speaks fluent English. There were a total of 5 passengers (1 other couple and a solo traveller) who all chatted together at times and spread out on the 50metre boat at other times. I started typing this while on the Nagi in fact. At first I had a little difficulty contacting Adisak so I contacted him via messenger then communication was very regular. I think the delay was because we travelled in low season so he was unsure if there were going to be enough passengers. We paid $115USD per person as we had already booked accommodation in Pakbeng and we organised our own transport to the border.\n\nSo many people have asked about the burning. Well in late April it was definitely noticeable and the hills in the distance were hazy but it did little to detract from the riverside outlooks which were clearly discernible. We stopped off at a couple of villages. At one we gave medical donations which they really appreciated (the chief liked the cabin case it came in too). Donations of kids clothes would probably go down really, really well at both places. We also stopped at Pak Ou cave. I thought I might be a little bit bored but the time flew. Interesting to hear some of the stories and there is always something to see along the Mekong whether it is someone fishing, a village or some water buffalo.\n\nThe boat leaves Pakbeng at 8am giving us just enough time to pop across the Mekong and meet a couple of the elephants that had woken us up earlier with their trumpeting. ($12USD – organised via Messenger with Wendy the French lady that manages the Mekong Elephant Sanctuary). This is a non riding sanctuary doing great things to improve the lives of the elephants in their care. Anyway, back to the Nagi. There are 2 western toilets. Outside of each are flip flops that you can use as you take your shoes off as you enter the boat. In my experience they weren’t necessary but there are large bins full of water that may slop around when other boats pass. Lunch each day was really delicious. Started with soup and then a variety of meats and salads with rice. Vegetarian options were available but I’d advise you to let them know beforehand. My partner is vegetarian and was well catered for too. Fruit and water (in bottles) were readily available and large BeerLao cost 18000kip. Once we got to Luang Prabang we were delivered to our hotel via airconditioned mini van. It was that good that I’d do it again! (There seems to be 2 tripadvisor pages so this review has been posted on both).",
    url: tripadvisorReview("671554784"),
  },
  {
    platform: "tripadvisor",
    reviewer: "Erich S",
    date: "2019-01-14",
    rating: 4,
    title: "2-tägige Bootstour auf dem Mekong in Laos",
    lang: "de",
    text: "Eine aufregend interessante Bootstour auf einem Mekong-Boot mit max. 20 Passagieren. Start bei der laotisch/thailändischen Grenze, endet bei Luang Prabang. Uebernachtet wird in Pakbeng (etwa in der Mitte der Strecke) in einem Hotel oder Lodge. Unbterwegs haben wir verschiedene Anlandungen gemacht und Bauerndörfer und Höhlen besucht. Das Essen wurde uns als Buffet auf dem Schiff serviert und war ausgezeichnet (kaum zu glauben, dass das in der winzigen Küche auf dem Schiff gemacht worden ist.\nWar wirklich interessant, wenn auch am frühen Morgen des 2. Tages etwas kühl. Grundsätzlich können wir diese Fahrt, mit welcher Reederei auch immer, wirklich nur empfehlen.",
    url: tripadvisorReview("645762897"),
  },
];
