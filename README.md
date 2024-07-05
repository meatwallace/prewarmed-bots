# prewarmed-bots

reworks SPT bot generation to prewarm the cache prior to a raid even being initiated.

this prevents mid-raid stutters and the dreaded lockup at raid start when vanilla SPT
generates a truckload of bots for that specific raid when combined with something like ALP.

this is very WIP - no caching prewarming is even implemented yet - we're just skipping the standard
precaching step which can cause some very inconsequential stutters, which beats the 60+ second hang
caused by using ALP with a few trader mods.
