<?php
/**
 * Demo fallback content.
 *
 * Returned when the matching post type has no published entries yet, so a
 * freshly activated theme already matches the design. As soon as you publish
 * real Guides / Discoveries / Reviews / Boards, the demo data is replaced.
 *
 * @package RelicQuest
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Demo guides.
 *
 * @return array
 */
function relicquest_demo_guides() {
	return array(
		array(
			'title'    => 'Tips for Finding Buried Treasure',
			'category' => 'Field Guide',
			'excerpt'  => 'Research, patience and the right ground. A practical field guide to turning hunches into finds.',
			'meta'     => 'M. Calloway · 8 min read',
		),
		array(
			'title'    => 'How to Choose Your First Metal Detector',
			'category' => 'Gear',
			'excerpt'  => 'VLF vs. PI, single vs. multi-frequency, and what actually matters for a beginner budget.',
			'meta'     => 'D. Reyes · 6 min read',
		),
		array(
			'title'    => 'Best Metal Detectors of the Year, Reviewed',
			'category' => 'Reviews',
			'excerpt'  => 'Hands-on impressions across budget, all-rounder and beach-specialist categories.',
			'meta'     => 'The Editors · 11 min read',
		),
	);
}

/**
 * Demo discoveries.
 *
 * @return array
 */
function relicquest_demo_discoveries() {
	return array(
		array( 'title' => 'Hoard of Roman denarii unearthed', 'meta' => 'Field find · Somerset' ),
		array( 'title' => 'Gold class ring recovered from surf', 'meta' => 'Beach hunt · Florida' ),
		array( 'title' => 'Civil War belt plate near old camp', 'meta' => 'Relic hunt · Virginia' ),
		array( 'title' => 'Half-ounce nugget from bench gravels', 'meta' => 'Prospecting · Yukon' ),
		array( 'title' => 'Bronze-age axe head in plough soil', 'meta' => 'Field find · Yorkshire' ),
		array( 'title' => 'Silver three-cent piece at the schoolhouse', 'meta' => 'Coin hunt · Ohio' ),
		array( 'title' => 'Trade token from a vanished saloon', 'meta' => 'Relic hunt · Montana' ),
		array( 'title' => 'Worn gold band beneath the boardwalk', 'meta' => 'Beach hunt · New Jersey' ),
	);
}

/**
 * Demo reviews.
 *
 * @return array
 */
function relicquest_demo_reviews() {
	return array(
		array( 'title' => 'TerraSeeker Pro X', 'category' => 'Best Overall', 'rating' => 4.8, 'excerpt' => 'Balanced depth, intuitive tones and an all-day-comfortable build.' ),
		array( 'title' => 'GroundHawk 200', 'category' => 'Best Value', 'rating' => 4.5, 'excerpt' => 'Punches well above its price for parks and fields.' ),
		array( 'title' => 'TideRunner WS', 'category' => 'Best for Beaches', 'rating' => 4.6, 'excerpt' => 'Multi-frequency performance that shrugs off salt and minerals.' ),
		array( 'title' => 'PinPoint Mini', 'category' => 'Best Pinpointer', 'rating' => 4.7, 'excerpt' => 'Fast, waterproof and precise — pinpoints in seconds.' ),
	);
}

/**
 * Demo forum board sections.
 *
 * @return array
 */
function relicquest_demo_boards() {
	return array(
		array(
			'section' => 'Featured Categories',
			'boards'  => array(
				array( 'title' => 'Treasure Hunting Q&A and Tips', 'desc' => 'Ask questions and share hard-won advice with the community.', 'topics' => 1280, 'posts' => 9420, 'last' => 'Best spots after heavy rain?', 'last_meta' => 'RiverRat · 12m ago' ),
				array( 'title' => 'Metal Detector Settings and Setup', 'desc' => 'Dial in your machine for the ground you hunt.', 'topics' => 405, 'posts' => 3110, 'last' => 'Ground balance on wet sand', 'last_meta' => 'BeachComber · 1h ago' ),
			),
		),
		array(
			'section' => 'Metal Detecting',
			'boards'  => array(
				array( 'title' => 'Coin & Relic Hunting', 'desc' => 'Old coins, buttons, buckles and the stories behind them.', 'topics' => 905, 'posts' => 7340, 'last' => '1853 seated dime in the park', 'last_meta' => 'DigginDan · 34m ago' ),
				array( 'title' => 'Beach & Water Detecting', 'desc' => 'Surf, sand and the gold that hides in it.', 'topics' => 612, 'posts' => 4980, 'last' => 'Lost ring recovery success', 'last_meta' => 'SaltyHunter · 2h ago' ),
			),
		),
		array(
			'section' => 'Gold Prospecting',
			'boards'  => array(
				array( 'title' => 'Sluicing & Panning Discovery', 'desc' => 'Working creeks and rivers for placer gold.', 'topics' => 503, 'posts' => 3890, 'last' => 'First pickers of the season', 'last_meta' => 'CreekFever · 5h ago' ),
				array( 'title' => 'Equipment & Gear Setup', 'desc' => 'Highbankers, dredges, pans and DIY rigs.', 'topics' => 288, 'posts' => 2110, 'last' => 'DIY highbanker build log', 'last_meta' => 'BuildItBob · 1d ago' ),
				array( 'title' => 'Gold Prospecting & Relic Hunting', 'desc' => 'Where prospecting and detecting overlap.', 'topics' => 199, 'posts' => 1540, 'last' => 'Bench gravels worth it?', 'last_meta' => 'PaydirtPete · 2d ago' ),
			),
		),
	);
}

/**
 * Demo coin identifier results.
 *
 * @return array
 */
function relicquest_demo_coins() {
	return array(
		array( 'name' => '1871 Indian Head Cent', 'detail' => 'Copper · USA · ~$15–$40', 'confidence' => 94, 'blurb' => 'Worn but legible date. A solid common-date find for any collection.' ),
		array( 'name' => '1866 Spanish Silver Real', 'detail' => 'Silver · Spain · ~$60–$120', 'confidence' => 88, 'blurb' => 'Colonial-era silver. Check edge wear before cleaning.' ),
		array( 'name' => '1877 Morgan Silver Dollar', 'detail' => 'Silver · USA · ~$45–$200', 'confidence' => 82, 'blurb' => 'Popular large silver dollar. Grade drives the value sharply.' ),
		array( 'name' => '1908 Liberty Head Eagle', 'detail' => 'Gold · USA · ~$900+', 'confidence' => 71, 'blurb' => 'Possible gold strike — verify weight and diameter.' ),
		array( 'name' => '1943 Steel Wheat Cent', 'detail' => 'Zinc-coated steel · USA · ~$0.50', 'confidence' => 69, 'blurb' => 'Wartime steel cent. Common, but a fun era piece.' ),
		array( 'name' => '1787 Fugio Cent', 'detail' => 'Copper · USA · ~$300+', 'confidence' => 63, 'blurb' => 'Early American copper. Authentication strongly recommended.' ),
	);
}
