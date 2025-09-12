<?php
namespace App\Http\Controllers;

use App\Models\Wish;
use App\Events\WishDrawn;
use Illuminate\Http\Request;

class WishController extends Controller
{

    public function index()
    {
        return response()->json(Wish::all());
    }


    public function show($id)
    {
        return response()->json(Wish::findOrFail($id));
    }


    public function delete($id)
    {
        $wish = Wish::find($id);
        if ($wish) {
            $wish->delete();
            return response()->json(['message' => 'Wish deleted successfully']);
        } else {
            return response()->json(['message' => 'Wish not found'], 404);
        }
    }

    public function draw($id)
    {
        $wish = Wish::find($id);

        if ($wish) {
            $data = $wish->toArray(); 
            $wish->delete();


            event(new WishDrawn($data));

            return response()->json([
                'wish' => $data
            ]);
        } else {
            return response()->json(['message' => 'Wish not found'], 404);
        }
    }
}
