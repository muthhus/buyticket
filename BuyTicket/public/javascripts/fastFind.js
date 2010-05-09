/*
 * Plugin for jQuery
 * fastFind Menu
 *
 * http://www.activespotlight.com
 *
 * $Copyright (c) 2006 Active8media, LLC
 * $Author:  JMcClure of Activespotlight.com
 * $License: http://labs.activespotlight.net/jQuery/license.html
 *
 * $Revision: 0.6.2 $
 *
 */

jQuery.ifastFind = {

	tileWidth : 0,
	tileInset : 1,
	tileCount : 0,
	tilesOnPg : 8,
	unlockKey : false,
	animation : false,
	helperImg : false,

	build : function (o)
	{
		// Define Default Values
		var s = {
				url 	  :	'feed.php',
				params    :	false,
				tileWidth :	200,
				tileInset :	0,
				tilesOnPg :	8,
				tileCount : 	0
			};

		// Update Submitted Options
		if(o) jQuery.extend(s,o);

		// Update Global Values
		jQuery.ifastFind.tileWidth = s.tileWidth;
		jQuery.ifastFind.tileInset = s.tileInset;
		jQuery.ifastFind.tileCount = s.tileCount;
		jQuery.ifastFind.tilesOnPg = s.tilesOnPg;

		// Check API Key
		if(s.params.apiKey)
			jQuery.ifastFind.unlockKey = s.params.apiKey
		else
		{
			var eMsg = 'Missing API Key - Unable to Continue';
			jQuery(this).html('<span style="color: red;">'+eMsg+'</span>');
			alert(eMsg);
			return false;
		}

                // Create Busy Image if Not Yet Created
                if(!jQuery.ifastFind.helperImg)
                {
                        helperImg = document.createElement('img');
                        helperImg.src = '../images/ajax.gif';
                        helperImg.style.position = 'absolute';
                        helperImg.style.bottom = '10px';
                        helperImg.style.left = '10px';
                        helperImg.style.display = 'none';
                        helperImg.id = 'ifM_helper';
                        // Should be determined based on parents (shortcut used currently)
                        jQuery('#debug').append(helperImg);
                        jQuery('img#ifM_helper').css('z-index','999999');
                        jQuery.ifastFind.helperImg = true;
                }

                // Bind AJAX Monitors
                jQuery("img#ifM_helper").ajaxStart(function(){ jQuery(this).animate({opacity:'show'},'fast'); });
                jQuery("img#ifM_helper").ajaxStop(function(){ jQuery(this).animate({opacity:'hide'},'slow'); });

		// Loop Through Each Instance (N.B. May not support more than one...)
		return this.each(
			function ()
			{
				jQuery.ifastFind.createTile(s.url,s.params);
			}
		);
	},

	countTiles : function ()
	{
		jQuery.ifastFind.tileCount = parseInt(jQuery('div.ifM_tile').size());
	},

	createTile : function (u,p)
	{
		// Create a new Tile
		var ptr = document.createElement('div');

		// Get Current Tile Count
		jQuery.ifastFind.countTiles();

		// Variable to Hold New Tile Number
		var ctr = jQuery.ifastFind.tileCount + 1;

		// Assign to New Div
		ptr.id = 'ifM_tile'+ctr;

		// Append New Tile To Page
		jQuery('div.ifM_wrapper').append(ptr);

		// Calculate Position of Current Tile
		var tileOffset = jQuery.ifastFind.tileWidth * jQuery.ifastFind.tileCount + jQuery.ifastFind.tileInset;

		// Apply Class to Tile
		jQuery('#ifM_tile'+ctr).addClass('ifM_tile');

		// Force Style on Tile
		jQuery('#ifM_tile'+ctr).css(
		{
			top		: 	0,
            left		:	tileOffset+'px',
			height		:	'288px',
			width		:	'158px',
			position	:	'absolute',
			overflow	:	'hidden',
			margin		:	0,
			padding		:	0,
			border		:	0,
			display		:	'block'
		});

		// Load Content	Into New Tile
		jQuery('#ifM_tile'+ctr).load(u, p,
			function()
			{

			// Bind Event Monitors
			jQuery('div.ifM_content a',this)
				.bind(
					'click',
					function ()
					{
						if(jQuery.ifastFind.animation==true) return false;
						var rslt = jQuery.ifastFind.parseLink(jQuery(this).attr('href'));
						if(rslt.status == 'link')
							document.location.href = rslt.link;
						else
						{
							jQuery.ifastFind.animation = true;
							jQuery.ifastFind.createTile(u,rslt);
						}
						return false;
					}
				);
			jQuery('div.ifM_back a', this)
				.bind(
					'click',
					function ()
					{
						var rslt = jQuery.ifastFind.parseLink(jQuery(this).attr('href'));
						if(rslt.status != 'link')
						{
							jQuery.ifastFind.scrollToTile(rslt.previous,'slow');
						}
						return false;
					}
				);
			jQuery('div.ifM_reset a', this)
				.bind(
					'click',
					function ()
					{
						jQuery.ifastFind.scrollToTile(0,1000);
						return false;
					}
				);
			jQuery('div.ifM_pager a', this)
				.bind(
					'click',
					function ()
					{
						var scroll = 'Down';
						if(jQuery(this).attr('rel')!='Down')
							scroll = 'Up';
						jQuery.ifastFind.scrollContent(0,scroll);
						return false;
					}
				);

			// Scroll to New Tile
	                jQuery.ifastFind.scrollToTile(ctr,'slow');

			} // End Load Function
		);

	},

	scrollToTile : function (n,s)
	{
		// Get Current Tile Count
		jQuery.ifastFind.countTiles();

		// Make Sure Count Is Not Too High
		if(n>jQuery.ifastFind.tileCount) n = jQuery.ifastFind.tileCount;

		// Adjust Speed
		if(!s) s = 'slow';

		// Make Sure Count Is Not Too Low
		if(n<1) n = 1;

                // Calculate Page Left Value
                var tmp = (jQuery.ifastFind.tileWidth * n) - jQuery.ifastFind.tileWidth;
		var now = tmp * -1;

		// Turn On Animation Safety
		jQuery.ifastFind.animation = true;

		// Animate
		jQuery('div.ifM_wrapper')
			.animate( { left: now },s, function ()
			{
		                // Remove Abandoned Tiles
                		if(n<jQuery.ifastFind.tileCount)
                        		jQuery.ifastFind.cleanTiles(n);
				// Make Sure in Correct Position
				if(now!=0) now += 'px';
				jQuery(this).css('left',now);
				// Check to Make Sure Not Clicked Too Fast
					/* clicking too fast can add an empty tile, this removes it */
/*
				if( ((tileWidth * tileCount) - tileWidth ) > (parseInt(jQuery(this).css('left')) * -1))
				{
					jQuery.ifastFind.scrollToTile(tileCount,'slow');
				}
*/
				jQuery.ifastFind.animation = false;
			}
		);
	},

	cleanTiles : function (n)
	{
		// Get Current Tile Count
                jQuery.ifastFind.countTiles();

		// Make Sure We Should Be Here
		if(n>=jQuery.ifastFind.tileCount) return false;

		// Starting Tile
		var start = n + 1;

		// Ending Tile
		var end   = jQuery.ifastFind.tileCount;

		// Loop Through and Destroy
		for(var i = start; i <= end; i++)
		{
			jQuery('#ifM_tile'+i).remove();
		}

	},

	scrollContent : function (e,d)
	{
		// Get Tile Count (Since moving left deletes tiles
		// to right, this is always the current tile)
		jQuery.ifastFind.countTiles();

		// Define Pointer to the Parent Container
		var pop = jQuery('#ifM_tile'+jQuery.ifastFind.tileCount);
		// Define Pointer to the Container that holds the link (scroll area)
		var box = jQuery(pop).children('.ifM_content');

		var bit = new Array();
		var ctr = 0; var top = 0; var lim = 8;	// 8 Per Page
		var amt = jQuery(box).children('a').length;

		// Define Pointer to All the Links (Needed to Make Sure Scroll is aligned)
		jQuery(box).children('a').each(
			function ()
			{
				bit[ctr] = this;
				if(jQuery(this).attr('rel')=='first')
					top = ctr;
				ctr++;
			}
		);

		// Move Links
		if(d == 'Up') top--; else top++;

		// Grab Pager Pointer
		var pgr = jQuery(pop).children('.ifM_pager');

		// Make Sure In Bounds
		if(top < 1)
		{
			top = 0;
			jQuery(pgr).children('a').each(function(){if(jQuery(this).attr('rel')=='Up')jQuery(this).hide();});
		}
		else { jQuery(pgr).children('a').each(function(){if(jQuery(this).attr('rel')=='Up')jQuery(this).show();}); }
		if(top >= amt - lim)
		{
			top = amt - lim;
			jQuery(pgr).children('a').each(function(){if(jQuery(this).attr('rel')=='Down')jQuery(this).hide();});
		}
		else { jQuery(pgr).children('a').each(function(){if(jQuery(this).attr('rel')=='Down')jQuery(this).show();}); }

		//alert('Top: '+top+', Lim: '+lim+', Amt: '+amt);

		// Toggle Display
		for(i=0;i<amt;i++)
		{
			if(i==top)
				jQuery(bit[i]).attr('rel','first');
			else
				jQuery(bit[i]).attr('rel','');
			if(i>=top && i<=top+lim)
				jQuery(bit[i]).css('display','block');
			else
				jQuery(bit[i]).css('display','none');
		}

	},

	parseLink : function (raw)
	{
		if(raw.substr(0,8) == 'fetch://')
		{
			var json = raw.substr(8,raw.length-8);
			var data = jQuery.ifastFind.parseJSON(json);
			// var data = eval('(' + json + ')'); // Depreciated
			data.status = 'ajax';
			return data;
		}
		var myOb = { 'link': raw, 'status': 'link' };
		return myOb;
	},

	toggleDisplay : function (r,f)
	{
	        if(jQuery(this).css('display')=='block')
                	var toggle_value = 'hide';
                else
                	var toggle_value = 'show';
		if(f==true)
		{
			jQuery(this).toggle();
		}
		else
		{
                	jQuery(this).animate(
                		{
                			opacity: toggle_value
                		}, 'slow', function ()
				{
					// Check for Reset Flag
					if(r==true)
						jQuery.ifastFind.scrollToTile(1,'fast');
				}
                	);
		}
	},

	parseJSON : function (d)
	{
		// Including parseJSON routine from JSON.org caused recursion error
		// http://www.reach1to1.com/sandbox/jquery/deserialize.js
		var data = d;
		var self = this;
		if (typeof d == 'undefined')
		{
			return self;
		}
                // Remove Trailing Splash IE Adds
                if(jQuery.browser.msie)
	                data = data.substr(0,data.length-1);

		if (d.constructor == Array)
		{
	                data={};
	                for(var i=0;i<d.length;i++)
	                        if (typeof data[d[i].name] != 'undefined')
                                	if (data[d[i].name].constructor!= Array)
                                        	data[d[i].name]=[data[d[i].name],d[i].value];
					else
                                        	data[d[i].name].push(d[i].value);
				else
                                	data[d[i].name]=d[i].value;
        	}
		else
			data = eval('('+data+')');
		return data;
	}
}

// Public Functions
jQuery.fn.fastFind 		= jQuery.ifastFind.build;
jQuery.fn.fastFindToggle 	= jQuery.ifastFind.toggleDisplay;
jQuery.fn.reverse 		= function() {return this.pushStack(this.get().reverse(), arguments);};
