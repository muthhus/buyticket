<?php
/*
 * Sample Output Parser for jQuery PopUp Menu Plugin
 *
 * License: http://labs.activespotlight.net/jQuery/license.html
 */

	// Defaults
	$current  = 1;
	$previous = 1;
	$apiKey   = false;
	$who	  = 'ActiveSpotLight';
	$depth	  = 1;

	// Load Passed Data
	if(isset($_REQUEST['current']))
		$current = (int)$_REQUEST['current'];
	if(isset($_REQUEST['previous']))
		$previous = (int)$_REQUEST['previous'];
	if(isset($_REQUEST['apiKey']))
		$apiKey = $_REQUEST['apiKey'];
	if(isset($_REQUEST['client']))
		$who = $_REQUEST['client'];

	// Tile Range Check
	$min = 1; $max = 100;
	$current = checkRange($current,$min,$max);

	// Check API
	if(!checkAPI($apiKey,$who))
	{
		makeTile('ERROR',array('error'=>'Invalid API Key'));
		exit;
	}

	// Parse Request
	$status = 'OKAY';
	$auth = ",'apiKey':'{$apiKey}','client':'{$who}'";
	switch($current)
	{
		case 8:		// ISSUES: 2006
                        $d = array(
                                'title'         =>      'Issues 2006',
                                'sub'           =>      'Select an issue from the list below',
                                'options'       =>      array(
                                                'October 2006'          =>      "http://atlanta.activespotlight.net/Gallery_3,28",
                                                'September 2006'        =>      "http://atlanta.activespotlight.net/Gallery_3,21",
                                                'August 2006'           =>      "http://atlanta.activespotlight.net/Gallery_3,16",
                                                'July 2006'             =>	"http://atlanta.activespotlight.net/Gallery_3,15",
						'June 2006'		=>	"http://atlanta.activespotlight.net/Gallery_3,11",
						'May 2006'		=>	"http://atlanta.activespotlight.net/Gallery_3,10",
						'April 2006'		=>	"http://atlanta.activespotlight.net/Gallery_3,6",
						'March 2006'		=>	"http://atlanta.activespotlight.net/Gallery_3,7")
                        );
			$depth = 2;
			break;
		case 7:		// CATEGORY: AUTOMOTIVE
                       $d = array(
                                'title'         =>      'Automotive',
                                'sub'           =>      'Select a brand from the list below',
                                'options'       =>      array(
                                                'Cadillac'            =>      "http://atlanta.activespotlight.net/Advertisement_3,11,77",
                                                'Hummer'              =>      "http://atlanta.activespotlight.net/Advertisement_3,16,150",
                                                'Saab'                =>      "http://atlanta.activespotlight.net/Advertisement_3,6,47")
                        );
			$depth = 2;
			break;
		case 6:		// CATEGORY: APPAREL
                        $d = array(
                                'title'         =>      'Apparel',
                                'sub'           =>      'Select a brand from the list below',
                                'options'       =>      array(
                                                'Blue Genes'            =>      "http://atlanta.activespotlight.net/Advertisement_3,21,209",
						'Intermix'		=>	"http://atlanta.activespotlight.net/Advertisement_3,7,31",
						'Kate Spade'		=>	"http://atlanta.activespotlight.net/Advertisement_3,7,25")
                        );
			$depth = 2;
			break;
		case 5:		// MORE OPTIONS
                        $d = array(
                                'title'         =>      'More Options',
                                'sub'           =>      'Select an option from the list below',
                                'options'       =>      array(
                                                'Visit AtlantaMagazine.com'             =>      "http://www.atlantamagazine.com/",
						'Visit ShopAtlantaMagazine.com'         =>      "http://www.shopatlantamagazine.com/",
						'Subscribe to Atlanta Magazine'         =>      "#",
						'Learn About Atlanta Magazine'          =>      "#",
						'Learn About ActiveSpotLight'           =>      "http://www.activeSpotLight.com/")
                        );
			break;
		case 4:		// ISSUES
			$d = array(
                                'title'         =>      'Issues',
                                'sub'           =>      'Select a year from the list below',
                                'options'       =>      array(
						'2006'		=>	"fetch://{'current':8,'previous':{$current}{$auth}}")
                        );
			break;
		case 3:		// CATEGORIES
			$d = array(
                                'title'         =>      'Categories',
                                'sub'           =>      'Select a category from the list below',
                                'options'       =>      array(
						'Apparel'		=>	"fetch://{'current':6,'previous':{$current}{$auth}}",
						'Automotive'		=>	"fetch://{'current':7,'previous':{$current}{$auth}}")
                        );
                        break;
		case 2:		// BRANDS
			$d = array(
                                'title'         =>      'Brands',
                                'sub'           =>      'Select a brand from the list below',
                                'options'       =>      array(
                                                'Atlantic Station'      =>      "http://atlanta.activespotlight.net/Advertisement_3,28,264",
						'BloomingDales'		=>	"http://atlanta.activespotlight.net/Advertisement_3,28,278",
						'Ferguson'		=>	"http://atlanta.activespotlight.net/Advertisement_3,28,267",
						'Lenox Square'		=>	"http://atlanta.activespotlight.net/Advertisement_3,28,268",
						'Georgia Premium Outlets'=>	"http://atlanta.activespotlight.net/Advertisement_3,28,269",
						'Oculus'		=>	"http://atlanta.activespotlight.net/Advertisement_3,28,270",
						'Pile Family Nurseries'	=>	"http://atlanta.activespotlight.net/Advertisement_3,28,273",
						'Saab'			=>	"http://atlanta.activespotlight.net/Advertisement_3,28,272",
						'Cadillac'		=>	"http://atlanta.activespotlight.net/Advertisement_3,28,265",
						'SCAD'			=>	"http://atlanta.activespotlight.net/Advertisement_3,28,275",
						'Top 10 Salons'		=>	"http://atlanta.activespotlight.net/Advertisement_3,28,274",
						'Cayman Islands'	=>	"http://atlanta.activespotlight.net/Advertisement_3,28,289")
                        );
			break;
		case 1:		// DEFAULT
		default:
			$d = array(
				'title' 	=> 	'Quick Navigation',
				'sub'		=>	'Use this menu to navigate this site quickly',
				'options'	=>	array(
						'Browse by Issue'		=>	"fetch://{'current':4,'previous':{$current}{$auth}}",
						'Browse by Brand'		=>	"fetch://{'current':2,'previous':{$current}{$auth}}",
						'Browse by Category'		=>	"fetch://{'current':3,'previous':{$current}{$auth}}",
						'More Options..'		=>	"fetch://{'current':5,'previous':{$current}{$auth}}")
			);
	}

	// Build Output
	makeTile($status,$d);

	// Ensure Range Fix
	function checkRange($num,$min,$max)
	{
		if($num<$min) return $min;
		if($num>$max) return $max;
		return $num;
	}

	// check API
	function checkAPI($api,$who)
	{
		// Not Provided in Demo
		return true;
	}

	// make Tile
	function makeTile($stat,$data)
	{

?>
		<div class="ifM_cats">
			<h1><? echo $data['title']; ?></h1>
			<p class="ifM_desc"><? echo $data['sub']; ?></p>
		</div>
		<div class="ifM_pager">
<?
		if(isset($data['options']) && count($data['options'])>8)
		{
?>
			<a href="#" rel="Up" title="Scroll Up" style="display:none"><img src="/resources/images/arrow_up.gif" alt="Scroll Up"/></a>
<?
		}
?>
		</div>
		<div class="ifM_content">
<?
		if(isset($stat) && $stat=='ERROR')
		{
			$eMsg = 'An unknown error has occurred';
			if(isset($data['error'])) $eMsg = $data['error'];
			echo "<span class=\"ifM_error\">{$eMsg}</span>";
		}
		else
		{
			if(isset($data['options']) && is_array($data['options']))
			{
				foreach($data['options'] as $name=>$link)
				{
					$class = (eregi('fetch://',$link))?' class="ifM_more"':'';
?>
			<a href="<? echo $link; ?>" <? echo $class; ?>><? echo $name; ?></a>
<?
				}
			}
		}
?>
		</div>
		<div class="ifM_pager">
<?
	        if(isset($data['options']) && count($data['options'])>8)
	        {
?>
			<a href="#" rel="Down" title="Scroll Down"><img src="/resources/images/arrow_dn.gif" alt="Scroll Down"/></a>
<?
		}
?>
		</div>
<?
		if($GLOBALS['previous'] > 0)
		{
?>
		<div class="ifM_back">
			<a href="fetch://{'previous':<? echo $GLOBALS['depth']; ?>}">&laquo; Back</a>
		</div>
<?
		}
		if($GLOBALS['previous'] > 1)
		{
?>
		<div class="ifM_reset">
			<a href="#">&laquo; Home</a>
		</div>
<?
		}
	}
?>
