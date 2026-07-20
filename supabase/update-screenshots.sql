-- SparkLaunch — point product screenshots at the real captured images.
-- Real screenshot first (carousel hero), branded cover second.

update public.products set screenshots = array['/shots/linear.png','/covers/linear.svg'] where id = 'prod-linear';
update public.products set screenshots = array['/shots/raycast.png','/covers/raycast.svg'] where id = 'prod-raycast';
update public.products set screenshots = array['/shots/supabase.png','/covers/supabase.svg'] where id = 'prod-supabase';
update public.products set screenshots = array['/shots/calcom.png','/covers/calcom.svg'] where id = 'prod-cal';
update public.products set screenshots = array['/shots/resend.png','/covers/resend.svg'] where id = 'prod-resend';
update public.products set screenshots = array['/shots/excalidraw.png','/covers/excalidraw.svg'] where id = 'prod-excalidraw';
update public.products set screenshots = array['/shots/plausible.png','/covers/plausible.svg'] where id = 'prod-plausible';
update public.products set screenshots = array['/shots/tally.png','/covers/tally.svg'] where id = 'prod-tally';
update public.products set screenshots = array['/shots/framer.png','/covers/framer.svg'] where id = 'prod-framer';
update public.products set screenshots = array['/shots/warp.png','/covers/warp.svg'] where id = 'prod-warp';
